import React, { FunctionComponent, useState, useEffect } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
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
    Info as InfoIcon,
} from "@mui/icons-material";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import Modal from "../layout/Modal";
import "./css/ModalForm.css";
import "./css/Controlpanel.css";

interface Props {
    navHeader: string;
}

interface Data {
    id: number;
    flightNumber: string;
    person_FirstName: string;
    person_LastName: string;
    person_Email: string;
    person_Phone: string;
    type: number;
    isConfirmed: boolean;
}

interface Soul {
    id: number;
    flightNumber: string;
    person_FirstName: string;
    person_LastName: string;
    person_Email: string;
    person_Phone: string;
    type: number;
    isConfirmed: boolean;
}


const PAGE_SIZE = 10;

const PassengersList: FunctionComponent<Props> = (props) => {
    const [Souls, setSouls] = useState<Soul[]>([]);
    const [data, setData] = useState<Soul[]>([]);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [selectedSoul, setSelectedSoul] = useState<Soul>({
        id: 0,
        flightNumber: '',
        person_FirstName: '',
        person_LastName: '',
        person_Email: '',
        person_Phone: '',
        type: 0,
        isConfirmed: false,
    });

    const navigate = useNavigate();

    const [newSoul, setNewSoul] = useState({
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
        type: 0,
        isConfirmed: false,
    });

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.soulList : no.soulList;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    useEffect(() => {
        async function fetchIncident() {
            try {
                const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul");
                const data = await response.json();
                const souls = data
                    .filter((soul: any) => soul.type === 0)
                    .map((soul: any) => ({
                        id: soul.id,
                        person_FirstName: soul.person.firstName,
                        person_LastName: soul.person.lastName,
                        person_Email: soul.person.email,
                        person_Phone: soul.person.phone,
                        flightNumber: soul.flight.flightNumber,
                    }));
                setSouls(souls);
            } catch (error) {
                console.error("Error while fetching passengers data:", error);
            }
        }
        fetchIncident();
    }, []);

    useEffect(() => {
        if (Souls.length > 0) {
            setData(Souls);
        }
    }, [Souls]);

    const handleSort = (property: keyof Data) => {
        const newData = [...data].sort((a, b) => {
            if (sortDirection === "asc") {
                return a[property] > b[property] ? 1 : -1;
            } else {
                return a[property] < b[property] ? 1 : -1;
            }
        });
        setData(newData);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

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

    //const filteredData = data.filter((item) =>
    //    item.flightNumber && item.flightNumber.toLowerCase().includes(searchQuery.toLowerCase())
    //);

    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    const visibleData = data.slice(
        currentPage * PAGE_SIZE,
        currentPage * PAGE_SIZE + PAGE_SIZE
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchQuery(value);
        setCurrentPage(0); // Reset to the first page when searching

        let filteredData = [];

        if (value !== "") {
            filteredData = data.filter(
                (item) =>
                    item.person_FirstName &&
                    item.person_FirstName.toLowerCase().includes(value.toLowerCase())
            );
        } else {
            filteredData = Souls;
        }

        setData(filteredData);
    };

    // Handles deletion of a soul with a specified ID
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Er du sikker på at du vil slette passasjer?"
        );
        if (!confirmed) {
            return;
        }

        try {
            await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul/${id}`, {
                method: "DELETE",
            });
            setSouls(Souls.filter((soul) => soul.id !== id));
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
                        type: 0,
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

    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {

            if (newSoul.person.firstName !== '') {
                selectedSoul.person_FirstName = newSoul.person.firstName
            }

            if (newSoul.person.lastName !== '') {
                selectedSoul.person_LastName = newSoul.person.lastName
            }

            if (newSoul.person.email !== '') {
                selectedSoul.person_Email = newSoul.person.email
            }

            if (newSoul.person.phone !== '') {
                selectedSoul.person_Phone = newSoul.person.phone
            }

            // Fetch the flight ID for the given flight number
            // Send the Soul data with the flight ID
            const response = await fetch(
                `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul/${selectedSoul.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        person: {
                            firstName: selectedSoul.person_FirstName,
                            lastName: selectedSoul.person_LastName,
                            email: selectedSoul.person_Email,
                            phone: selectedSoul.person_Phone,
                        },
                        type: selectedSoul.type,
                        isConfirmed: selectedSoul.isConfirmed,
                    }),
                }
            );

            if (response.ok) {
                console.log("Soul updated successfully");
                setIsEditModalOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setEdited(true);
            } else {
                console.error("Error editing Soul");
                setIsNewModalOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setEdited(true);
            }
        } catch (error) {
            console.error("Error editing Soul:", error);
        }
    };

    const handleAdd = async () => {
        // Open the edit modal
        setIsNewModalOpen(true);
    };

    //TODO: Fungerer ikke
    const handleEdit = async (soulId: string) => {
        const soul = await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul/${soulId}`).then(
            (res) => res.json()
        );

        // Store the selected soul in the state
        setSelectedSoul(soul);

        // Open the edit modal
        setIsEditModalOpen(true);
        console.log(JSON.stringify(soul));
    };

    // TODO: Fikse på modalene
    return (
        <DefaultContainer
            navHeader={texts.passengers}
            onLanguageChange={handleLanguageChange}
        >
            <div className="SearchField">
                <TextField
                    label={texts.searchPassengers}
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
                    Legg til passasjer
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
                                        onClick={() => handleSort("id")}
                                    >
                                        <h3>Id </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("flightNumber")}
                                    >
                                        <h3> {texts.flight}</h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("person_FirstName")}
                                    >
                                        <h3> {texts.firstName} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("person_LastName")}
                                    >
                                        <h3> {texts.lastName} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("person_Email")}
                                    >
                                        <h3> {texts.email} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={sortDirection}
                                        onClick={() => handleSort("person_Phone")}
                                    >
                                        <h3> {texts.phone} </h3>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleData.length > 0 ? (
                                visibleData.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.flightNumber}</TableCell>
                                        <TableCell>{item.person_FirstName}</TableCell>
                                        <TableCell>{item.person_LastName}</TableCell>
                                        <TableCell>{item.person_Email}</TableCell>
                                        <TableCell>{item.person_Phone}</TableCell>
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
                                            <IconButton
                                                aria-label="detail"
                                                color="secondary"
                                                onClick={() => navigate(`/SoulInformation/${item.id}`)}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>{texts.noPassengers}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        {visibleData.length > PAGE_SIZE && (
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
                        <form onSubmit={handleEditSubmit}>
                            <div className="container">
                                <div>
                                    <label htmlFor="firstName">Fornavn</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        name="firstName"
                                        type="text"
                                        defaultValue={selectedSoul?.person_FirstName}
                                        onChange={handleChange}
                                        inputProps={{
                                            pattern: "^([\p{L}\p{P}\d+](\s)?){2,31}$",
                                            required: true,
                                        }}
                                        style={{ width: "450px" }}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastName">Etternavn</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        name="lastName"
                                        type="text"
                                        defaultValue={selectedSoul?.person_LastName}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">E-post</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        name="email"
                                        type="text"
                                        defaultValue={selectedSoul?.person_Email}
                                        onChange={handleChange}
                                        inputProps={{
                                            pattern: "^([\p{L}\p{P}\d+](\s)?){2,31}$",
                                            required: true,
                                        }}
                                        style={{ width: "450px" }}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone">Telefon</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        name="phone"
                                        type="text"
                                        defaultValue={selectedSoul?.person_Phone}
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
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#369E3B",
                                        width: "230px",
                                        height: "40px",
                                    }}
                                >
                                    Endre opplysninger
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
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Tilbake
                                </Button>
                            </div>
                        </form>
                    </Modal>

                    <Modal
                        modalHeadLine="Legg til passasjer"
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

export default PassengersList;
