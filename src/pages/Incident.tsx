import React, { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Table,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Alert,
    Stack,
    Input,
} from "@mui/material";
import DefaultContainer from "../layout/DefaultContainer";
import Modal from "../layout/Modal";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";
import "./css/ModalForm.css";

interface Data {
    id: number;
    createdAt: string;
    timeOfIncident: string;
    flightNumber: string;
    flight: {
        id: number;
        origin: string;
        departureTime: string;
        destination: string;
        arrivalTime: string;
        seatCapacity: number;
        price: string;
        airline: string;
    };
    description: string;
    airlineName: string;
    departureTime: string;
    arrivalTime: string;
    isActive: boolean;
}

interface Params {
    id: string;
}

// TODO: Må legge inn felt for historisk hendelse/hendelse som ikke er aktiv
const HRKtest: FunctionComponent<any> = (props) => {
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.incident : no.incident;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const [edited, setEdited] = useState(false);
    const [deactivated, setDeactivated] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState<Data>({
        id: 0,
        createdAt: '',
        timeOfIncident: '',
        flightNumber: '',
        flight: {
            id: 0,
            origin: '',
            departureTime: '',
            destination: '',
            arrivalTime: '',
            seatCapacity: 0,
            price: '',
            airline: '',
        },
        description: '',
        airlineName: '',
        departureTime: '',
        arrivalTime: '',
        isActive: false,
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState<Data | null>(null);

    const { id } = useParams();

    const fetchIncidentData = (id: any) => {
        fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setData({
                    id: data.id,
                    createdAt: data.createdAt,
                    timeOfIncident: data.timeOfIncident,
                    flightNumber: data.flightNumber,
                    flight: {
                        id: data.flight.id,
                        origin: data.flight.origin,
                        departureTime: data.flight.departureTime,
                        destination: data.flight.destination,
                        arrivalTime: data.flight.arrivalTime,
                        seatCapacity: data.flight.seatCapacity,
                        price: data.flight.price,
                        airline: data.flight.airline,
                    },
                    description: data.description,
                    airlineName: data.flight.airline,
                    departureTime: data.flight.departureTime,
                    arrivalTime: data.flight.arrivalTime,
                    isActive: data.isActive,
                });
            });
    };

    useEffect(() => {
        fetchIncidentData(id);
    }, [id]);

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("nb-NO");
    };

    const handleChange = () => {
        setIsEditModalOpen(true);
    };

    // TODO: Endre hendelse fungerer ikke
    const handleEdit = async (flightId: any) => {
        const incident = await fetch(
            `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${flightId}`
        ).then((res) => res.json());

        // Store the selected Incident in the state
        setSelectedIncident(incident);
        setEdited(true);

        // Open the edit modal
        setIsEditModalOpen(true);
        console.log(JSON.stringify(incident));
    };

    const [isActive, setIsActive] = useState<boolean>(data.isActive);

    const handleIsActiveChange = () => {
        // Update the state
        setIsActive(false);
        setData((prevData) => ({
            ...prevData,
            isActive: false,
        }));

        // Display the alert
        if (window.confirm("Are you sure you want to deactivate the incident?")) {
            // Create a new object that includes all the incident properties and sets isActive to false
            const updatedIncident = {
                ...data,
                isActive: false,
            };

            // Make a PUT request to update the incident in the backend API
            fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedIncident),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to update the incident");
                    }
                    setDeactivated(true);
                    // Navigate to the historicalincidents page after the incident is updated
                    setTimeout(() => {
                        navigate("/historicalincidents");
                    }, 3000);
                })
                .catch((error) => {
                    console.error(error);
                    // Handle error
                });
        } else {
            // If the user cancels the action, revert the state changes
            setIsActive(true);
            setData((prevData) => ({
                ...prevData,
                isActive: true,
            }));
        }
    };

    return (
        <>
            <DefaultContainer
                navHeader="Test"
                onLanguageChange={handleLanguageChange}
            >
                <Button
                    className="add-crew"
                    onClick={() => handleChange()}
                    variant="contained"
                    style={{
                        position: "absolute",
                        top: "17%",
                        right: "1%",
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
                    {texts.changeIncident}
                </Button>

                {data.isActive && (
                    <Button
                        className="deactivate-incident"
                        onClick={handleIsActiveChange}
                        variant="contained"
                        style={{
                            position: "absolute",
                            top: "17%",
                            left: "1%",
                            width: "250px",
                            height: "54px",
                            margin: 2,
                            backgroundColor: "#FF0000",
                        }}
                        sx={{
                            ":hover": { backgroundColor: "#FF0000" },
                            margin: 1,
                        }}
                    >
                        {texts.deactivate}
                    </Button>
                )}

                <div className="App">
                    <header className="App-header">
                        <h1>{texts.incident}</h1>
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
                        {deactivated && (
                            <Stack
                                sx={{ width: "97%", position: "centered", margin: "20px" }}
                                spacing={2}
                            >
                                <Alert severity="success" onClose={() => setDeactivated(false)}>
                                    Hendelse ble deaktivert
                                </Alert>
                            </Stack>
                        )}
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>ID: {data.id}</TableCell>
                                    <TableCell>
                                        {texts.flight}: {data.flightNumber || "Null"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {texts.origin}: {data.flight?.origin || "Null"}
                                    </TableCell>
                                    <TableCell>
                                        {texts.destination}: {data.flight?.destination || "Null"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {texts.departure}: {formatTime(data.departureTime)}
                                    </TableCell>
                                    <TableCell>
                                        {texts.arrival}: {formatTime(data.arrivalTime)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{texts.description}</TableCell>
                                    <TableCell>{data.description}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Modal
                            modalHeadLine={texts.changeIncident}
                            isOpen={isEditModalOpen}
                        >
                            <h2></h2>
                            <div className="container">
                                <div>
                                    <label htmlFor="incident-time">{texts.timeOfIncident}</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        id="incident-time"
                                        name="timeOfIncident"
                                        type="text"
                                        placeholder={selectedIncident?.timeOfIncident}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="flight-number">{texts.flight}</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        id="flight-number"
                                        name="flightNumber"
                                        type="text"
                                        placeholder={selectedIncident?.flightNumber}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description">{texts.description}</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder={selectedIncident?.description}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="departure-time">{texts.departure}</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        id="departure-time"
                                        name="departureTime"
                                        type="text"
                                        placeholder={selectedIncident?.departureTime}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="arrival-time">{texts.arrival}</label>
                                    <br />
                                    <Input
                                        className="input-form"
                                        id="arrival-time"
                                        name="arrivalTime"
                                        type="text"
                                        placeholder={selectedIncident?.arrivalTime}
                                        onChange={handleChange}
                                        style={{ width: "450px" }}
                                        required
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
                                    onSubmit={() => handleEdit(selectedIncident?.flight.id)}
                                >
                                    {texts.changeIncident}
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
                                    {texts.back}
                                </Button>
                            </div>
                        </Modal>

                        <Link to="/HRK_controlpanel">{texts.back}</Link>
                    </header>
                </div>
            </DefaultContainer>
        </>
    );
};

export default HRKtest;
