import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
    TextField,
    IconButton,
    Stack,
    Alert,
} from "@mui/material";
import {
    DeleteForever as DeleteIcon,
    Edit as EditIcon,
} from "@mui/icons-material";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

interface Props {
    navHeader: string;
}

interface Data {
    id: number;
    flight: {
        flightNumber: string;
    };
    person: {
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
    };
    isConfirmed: boolean;
}

const PAGE_SIZE = 10;

const NoMatch: FunctionComponent<Props> = (props) => {
    const [affected, setAffected] = useState<Data[]>([]);
    const [data, setData] = useState<Data[]>([]);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.noMatch : no.noMatch;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);
    const [added, setAdded] = useState(false);

    let allAffected: any = [];

    useEffect(() => {
        async function fetchAffected() {
            try {
                const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected");
                const data = await response.json();
                const affected = data.map((affected: any) => {
                    if (affected.flight) {
                        return {
                            id: affected.id,
                            flightNumber: affected.flight.flightNumber,
                            firstName: affected.person.firstName,
                            lastName: affected.person.lastName,
                            phone: affected.person.phone,
                            isConfirmed: affected.isConfirmed,
                        };
                    } else {
                        return {
                            id: affected.id,
                            flightNumber: "",
                            firstName: affected.person.firstName,
                            lastName: affected.person.lastName,
                            phone: affected.person.phone,
                            isConfirmed: affected.isConfirmed,
                        };
                    }
                });
                setAffected(affected);
                allAffected = affected;
            } catch (error) {
                console.error("Error while fetching affected data:", error);
            }
        }
        fetchAffected();
    }, []);

    useEffect(() => {
        if (affected.length > 0) {
            setData(affected);
        }
    }, [affected]);

    const handleSort = (property: any) => {
        const newData = [...allAffected].sort((a, b) => {
            if (sortDirection === "asc") {
                return a[property] > b[property] ? 1 : -1;
            } else {
                return a[property] < b[property] ? 1 : -1;
            }
        });
        setData(newData);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchQuery(value);
        setCurrentPage(0); // Reset to the first page when searching
    };

    const filteredData = data.filter(
        (item: any) =>
            item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !item.isConfirmed
    );

    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    const visibleData = data.slice(
        currentPage * PAGE_SIZE,
        currentPage * PAGE_SIZE + PAGE_SIZE
    );

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Er du sikker på at du vil slette ansatt?"
        );
        if (!confirmed) {
            return;
        }
        try {
            await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected/${id}`, {
                method: "DELETE",
            });
            setAffected(affected.filter((affected) => affected.id !== id));
            setDeleted(true);
        } catch (error) {
            console.error("Error while deleting affected:", error);
        }
    };

    const onEditRow = (row: any, index: any) => {

    }

    // TODO: Mulighet til å endre og legge til. Trykke for å få informasjon om pårørende
    return (
        <DefaultContainer
            navHeader={texts.title}
            onLanguageChange={handleLanguageChange}
        >
            <div className="SearchField">
                <TextField
                    label={texts.search}
                    variant="outlined"
                    onChange={handleSearch}
                />
                {deleted && (
                    <Stack
                        sx={{ width: "95%", position: "centered", margin: "20px" }}
                        spacing={2}
                    >
                        <Alert severity="success" onClose={() => setDeleted(false)}>
                            Pårørende slettet!
                        </Alert>
                    </Stack>
                )}
                {edited && (
                    <Stack
                        sx={{ width: "95%", position: "centered", margin: "20px" }}
                        spacing={2}
                    >
                        <Alert severity="success" onClose={() => setEdited(false)}>
                            Opplysningene til pårørende ble endret
                        </Alert>
                    </Stack>
                )}
                {added && (
                    <Stack
                        sx={{ width: "95%", position: "centered", margin: "20px" }}
                        spacing={2}
                    >
                        <Alert severity="success" onClose={() => setAdded(false)}>
                            Pårørende ble lagt inn
                        </Alert>
                    </Stack>
                )}
                <div className="IncidentTable">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("firstName")}
                                    >
                                        <h3> {texts.firstName} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("lastName")}
                                    >
                                        <h3> {texts.lastName} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("flightNumber")}
                                    >
                                        <h3> {texts.flight} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel active={true} direction={sortDirection}>
                                        <h3> {texts.phone} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.firstName}</TableCell>
                                        <TableCell>{item.lastName}</TableCell>
                                        <TableCell>{item.flightNumber}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => onEditRow(0, 0)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                color="secondary"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>Fant ingen ansatte.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        {filteredData.length > PAGE_SIZE && (
                            <div className="Buttons">
                                <button
                                    disabled={isFirstPage}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    {texts.previous}
                                </button>
                                <span>
                                    {texts.page}
                                    {` ${currentPage + 1} av ${totalPages}`}
                                </span>
                                <button
                                    disabled={isLastPage}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    {texts.next}
                                </button>
                            </div>
                        )}
                    </Table>
                </div>
            </div>
        </DefaultContainer>
    );
};

export default NoMatch;
