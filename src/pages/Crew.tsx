import React, { useState, useEffect, FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
    TextField,
    Button,
    Input,
    IconButton,
    Alert,
    Stack,
} from "@mui/material";
import {
    DeleteForever as DeleteIcon,
    Edit as EditIcon,
} from "@mui/icons-material";
import DefaultContainer from "../layout/DefaultContainer";
import Modal from "../layout/Modal";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";
import "./css/ModalForm.css";

// Define the structure of the data object
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
}

const PAGE_SIZE = 10;

const Crew: FunctionComponent<any> = (props) => {
    const [souls, setSouls] = useState<Data[]>([]);
    const [data, setData] = useState<Data[]>([]);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [selectedSoul, setSelectedSoul] = useState<Data | null>(null);
    const [newSoul, setNewSoul] = useState({
        id: 0,
        flight: {
            flightNumber: "",
            flightId: "",
        },
        person: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
        type: 1,
        isConfirmed: false,
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewSoul((prevState) => ({
            ...prevState,
            person: {
                ...prevState.person,
                [name]: value,
            },
        }));
    };

    const handleFlightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSoul((prevState) => ({
            ...prevState,
            flight: {
                ...prevState.flight,
                flightNumber: event.target.value,
            },
        }));
    };

    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);
    const [added, setAdded] = useState(false);

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.soulList : no.soulList;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    // Use an effect hook to fetch data from the API and update the souls state variable
    let allSouls: any = [];
    useEffect(() => {
        async function fetchSoul() {
            try {
                const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul");
                const data = await response.json();
                const filteredData = data.filter((soul: any) => soul.type === 1);
                const souls = filteredData.map((soul: any) => {
                    if (soul.flight) {
                        return {
                            id: soul.id,
                            flightNumber: soul.flight.flightNumber,
                            firstName: soul.person.firstName,
                            lastName: soul.person.lastName,
                            phone: soul.person.phone,
                        };
                    } else {
                        return {
                            id: soul.id,
                            flightNumber: "",
                            firstName: soul.person.firstName,
                            lastName: soul.person.lastName,
                            phone: soul.person.phone,
                        };
                    }
                });
                setSouls(souls);
                allSouls = souls;
            } catch (error) {
                console.error("Error while fetching soul data:", error);
            }
        }
        fetchSoul();
    }, []);

    // Use an effect hook to update the data state variable when the souls state variable changes

    useEffect(() => {
        if (souls.length > 0) {
            setData(souls);
            allSouls = souls;
        }
    }, [souls]);

    // Handles sorting of data by a specified property and direction
    const handleSort = (property: any) => {
        const newData = [...allSouls].sort((a, b) => {
            if (sortDirection === "asc") {
                return a[property] > b[property] ? 1 : -1;
            } else {
                return a[property] < b[property] ? 1 : -1;
            }
        });
        setData(newData);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    // Handles searching of data by first name
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchQuery(value);
        setCurrentPage(0); // Reset to the first page when searching
    };

    const filteredData = data.filter(
        (item: any) =>
            item.firstName &&
            item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculates the total number of pages based on the number of items and the page size
    const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    // Gets the data for the currently visible page based on the current page and page size
    const visibleData = filteredData.slice(
        currentPage * PAGE_SIZE,
        currentPage * PAGE_SIZE + PAGE_SIZE
    );

    // Handles deletion of a soul with a specified ID
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Er du sikker på at du vil slette ansatt?"
        );
        if (!confirmed) {
            return;
        }

        try {
            await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul/${id}`, {
                method: "DELETE",
            });
            setSouls(souls.filter((soul) => soul.id !== id));
            setDeleted(true);
        } catch (error) {
            console.error("Error while deleting soul:", error);
        }
    };

    // TODO: FlightId. Nå legges samme FlightID inn uavhengig av FlightNumber
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Fetch the flight ID for the given flight number
            const flightNumber = newSoul.flight.flightNumber;
            const flightResponse = await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Flight`);
            const flightData = await flightResponse.json();
            const flightId = flightData[0].id;
            console.log(flightId);

            // Send the Soul data with the flight ID
            const response = await fetch(
                `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/flight/${flightId}/soul`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        person: {
                            firstName: newSoul.person.firstName,
                            lastName: newSoul.person.lastName,
                            email: newSoul.person.email,
                            phone: newSoul.person.phone,
                        },
                        type: 1,
                        isConfirmed: false,
                    }),
                }
            );

            if (response.ok) {
                console.log("Soul added successfully");
                setIsNewModalOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setAdded(true);
            } else {
                console.error("Error adding Soul");
                setIsNewModalOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setAdded(true);
            }
        } catch (error) {
            console.error("Error adding Soul:", error);
        }
    };

    const handleAdd = async () => {
        // Open the edit modal
        setIsNewModalOpen(true);
    };

    // TODO: Endre ansatt fungerer ikke
    const handleEdit = async (soulId: any) => {
        const soul = await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul/${soulId}`).then(
            (res) => res.json()
        );

        // Store the selected soul in the state
        setSelectedSoul(soul);
        setEdited(true);

        // Open the edit modal
        setIsEditModalOpen(true);
        console.log(JSON.stringify(soul));
    };

    // TODO: Hvis tid: Fikse på utseendet til modalene
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

                <Button
                    className="add-crew"
                    onClick={() => handleAdd()}
                    variant="contained"
                    style={{
                        position: "absolute",
                        top: "17%",
                        right: "2%",
                        width: "250px",
                        height: "54px",
                        margin: 2,
                        backgroundColor: "#369E3B",
                    }}
                    sx={{
                        ":hover": { backgroundColor: "#369E3B" },
                        margin: 1,
                    }}
                >
                    Legg til ansatt
                </Button>
                {deleted && (
                    <Stack
                        sx={{ width: "97%", position: "centered", margin: "20px" }}
                        spacing={2}
                    >
                        <Alert severity="success" onClose={() => setDeleted(false)}>
                            Ansatt slettet!
                        </Alert>
                    </Stack>
                )}
                {edited && (
                    <Stack
                        sx={{ width: "97%", position: "centered", margin: "20px" }}
                        spacing={2}
                    >
                        <Alert severity="success" onClose={() => setEdited(false)}>
                            Opplysningene til ansatt ble endret
                        </Alert>
                    </Stack>
                )}
                {added && (
                    <Stack
                        sx={{ width: "97%", position: "centered", margin: "20px" }}
                        spacing={2}
                    >
                        <Alert severity="success" onClose={() => setAdded(false)}>
                            Ansatt ble lagt inn
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
                            {visibleData.length > 0 ? (
                                visibleData.map((item: any) => (
                                    <TableRow
                                        key={item.id}
                                        component={Link}
                                        to={`/SoulInformation/${item.id}`}
                                    >
                                        <TableCell>{item.firstName}</TableCell>
                                        <TableCell>{item.lastName}</TableCell>
                                        <TableCell>{item.flightNumber}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(item.id)}>
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
                                    <TableCell colSpan={4}>{texts.notFound}.</TableCell>
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

                    <Modal
                        modalHeadLine="Endre opplysninger"
                        isOpen={isEditModalOpen}
                    >
                        <h2></h2>
                        <div className="container">
                            <div>
                                <label htmlFor="soul-firstName">Fornavn</label>
                                <br />
                                <Input
                                    className="input-form"
                                    id="soul-firstName"
                                    name="soul-firstName"
                                    type="text"
                                    placeholder={selectedSoul?.person.firstName}
                                    onChange={handleChange}
                                    inputProps={{
                                        pattern: "^([\p{L}\p{P}\d+](\s)?){2,31}$",
                                        required: true,
                                    }}
                                    style={{ width: "450px" }}
                                />
                            </div>

                            <div>
                                <label htmlFor="soul-firstName">Etternavn</label>
                                <br />
                                <Input
                                    className="input-form"
                                    id="soul-firstName"
                                    name="soul-firstName"
                                    type="text"
                                    placeholder={selectedSoul?.person.lastName}
                                    onChange={handleChange}
                                    inputProps={{
                                        pattern: "^([\p{L}\p{P}\d+](\s)?){2,31}$",
                                        required: true,
                                    }}
                                    style={{ width: "450px" }}
                                />
                            </div>

                            <div>
                                <label htmlFor="soul-firstName">E-post</label>
                                <br />
                                <Input
                                    className="input-form"
                                    id="soul-firstName"
                                    name="soul-firstName"
                                    type="text"
                                    placeholder={selectedSoul?.person.email}
                                    onChange={handleChange}
                                    inputProps={{
                                        pattern: "^([\p{L}\p{P}\d+](\s)?){2,31}$",
                                        required: true,
                                    }}
                                    style={{ width: "450px" }}
                                />
                            </div>

                            <div>
                                <label htmlFor="soul-firstName">Telefon</label>
                                <br />
                                <Input
                                    className="input-form"
                                    id="soul-firstName"
                                    name="soul-firstName"
                                    type="text"
                                    placeholder={selectedSoul?.person.phone}
                                    onChange={handleChange}
                                    inputProps={{
                                        pattern: "^([\p{L}\p{P}\d+](\s)?){2,31}$",
                                        required: true,
                                    }}
                                    style={{ width: "450px" }}
                                />
                            </div>
                        </div>

                        <div className="btn-container">
                            <Button
                                className="change-btn"
                                type="submit"
                                form="ic-form__affected"
                                variant="contained"
                                style={{
                                    backgroundColor: "#369E3B",
                                    width: "230px",
                                    height: "40px",
                                }}
                                onSubmit={() => handleEdit(selectedSoul?.id)}
                            >
                                Endre opplysninger
                            </Button>

                            <Button
                                className="back-btn"
                                type="submit"
                                form="ic-form__affected"
                                variant="contained"
                                style={{
                                    backgroundColor: "#369E3B",
                                    width: "230px",
                                    height: "40px",
                                }}
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Tilbake
                            </Button>
                        </div>
                    </Modal>

                    <Modal
                        modalHeadLine="Legg til ansatt"
                        isOpen={isNewModalOpen}
                    >
                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    First Name:
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={newSoul.person.firstName}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </label>
                                <label>
                                    Last Name:
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={newSoul.person.lastName}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </label>
                                <label>
                                    Email:
                                    <Input
                                        type="email"
                                        name="email"
                                        value={newSoul.person.email}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </label>
                                <label>
                                    Phone:
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={newSoul.person.phone}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </label>
                                <label>
                                    Flight Number:
                                    <Input
                                        type="text"
                                        name="flightNumber"
                                        value={newSoul.flight.flightNumber}
                                        onChange={handleFlightChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </label>
                                <div className="btn-container">
                                    <Button
                                        type="submit"
                                        className="change-btn"
                                        variant="contained"
                                        style={{
                                            backgroundColor: "#369E3B",
                                            width: "230px",
                                            height: "40px",
                                        }}
                                    >
                                        Legg til ansatt
                                    </Button>

                                    <Button
                                        className="back-btn"
                                        type="submit"
                                        variant="contained"
                                        style={{
                                            backgroundColor: "#369E3B",
                                            width: "230px",
                                            height: "40px",
                                        }}
                                        onClick={() => setIsNewModalOpen(false)}
                                    >
                                        Tilbake
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
        </DefaultContainer>
    );
};

export default Crew;
