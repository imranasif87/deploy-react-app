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
    Button,
} from "@mui/material";
import "./../css/Controlpanel.css";
import NavBar from "../../layout/NavBar";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DefaultContainer from "../../layout/DefaultContainer";
import en from "../../languages/en.json";
import no from "../../languages/no.json";

interface Props {
    navHeader: string;
}

interface Data {
    id: number;
    role: number;
    person: {
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
    };
}

const PAGE_SIZE = 10;

const Users: FunctionComponent<Props> = (props) => {
    const [users, setUsers] = useState<Data[]>([]);
    const [data, setData] = useState<Data[]>([]);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.user : no.user;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    let usersInfo: any = [];

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User");
                const data = await response.json();
                const users = data.map((user: any) => ({
                    id: user.id,
                    firstName: user.person.firstName,
                    lastName: user.person.lastName,
                    phone: user.person.phone,
                    email: user.person.email,
                    role: user.role,
                }));
                setUsers(users);
                usersInfo = users;
            } catch (error) {
                console.error("Error while fetching user data:", error);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            setData(users);
        }
    }, [users]);

    const handleSort = (property: any) => {
        const newData = [...usersInfo].sort((a, b) => {
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

    const filteredData = data.filter((item: any) =>
        item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    const visibleData = data.slice(
        currentPage * PAGE_SIZE,
        currentPage * PAGE_SIZE + PAGE_SIZE
    );

    const handleDelete = async (id: number) => {
        try {
            await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/${id}`, {
                method: "DELETE",
            });
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error while deleting user:", error);
        }
    };

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
                                        <h3> {texts.email} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel active={true} direction={sortDirection}>
                                        <h3> {texts.phone} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("flightNumber")}
                                    >
                                        <h3> {texts.role} </h3>
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
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>
                                            {item.role === 0
                                                ? "Førstekontakt"
                                                : item.role === 1
                                                    ? "HRK-bruker"
                                                    : ""}
                                        </TableCell>
                                        <TableCell>
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
                                    <TableCell colSpan={4}>{texts.noUsers}.</TableCell>
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

export default Users;
