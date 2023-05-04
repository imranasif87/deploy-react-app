import React, { FunctionComponent, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useParams } from "react-router-dom";
import {
    TableCell,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import DefaultContainer from "../layout/DefaultContainer";
import dayjs from "dayjs";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

interface Params {
    id: string;
}

const AffectedInformation: FunctionComponent<any> = (props) => {
    //const { navHeader } = props;

    // State for the current language
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.affected : no.affected;

    // Handle language change
    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    // State for the time of hotel, transport, and funeral
    const [timeOfHotel, setTimeOfHotel] = useState<any>(null);
    const [timeOfTransport, setTimeOfTransport] = useState(null);
    const [timeOfFuneral, setTimeOfFuneral] = useState(null);

    // Handle date changes for the hotel time
    const handleDateChange = (date: Date | null) => {
        setTimeOfHotel(date);
    };

    // State for the affected data
    const [data, setData] = useState<any>({
        id: 0,
        person: {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
        souls: [],
        incident: null,
        processed: {
            id: 0,
            status: "",
            timestamp: "",
            user: "",
        },
        goingFunerals: [],
        accommodations: {
            id: 0,
            fromDate: "",
            toDate: "",
            location: "",
            name: "",
            costEntries: [],
        },
        transports: [],
        logEntries: [],
        isConfirmed: false,
    });

    const { id } = useParams();

    // Fetch the affected data from the API
    const fetchAffectedData = (id: any) => {
        fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setData(data);
            });
    };

    useEffect(() => {
        fetchAffectedData(id);
    }, [id]);

    const setDescriptionValue = (value: any) => {

    }

    return (
        <DefaultContainer
            navHeader={texts.title}
            onLanguageChange={handleLanguageChange}
        >
            <div className="App-affected-information">
                <header className="App-header">
                    <h1>
                        {texts.affected} - {data.person.firstName} {data.person.lastName}
                    </h1>
                </header>
                <div className="table-wrapper">
                    <div className="table-container">
                        <Table>
                            <thead>
                                <tr>
                                    <th>{texts.information}</th>
                                </tr>
                            </thead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {texts.firstName}: {data.person.firstName}{" "}
                                        {data.person.lastName}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {texts.phone}: {data.person.phone}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {texts.email}: {data.person.email}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="table-container">
                        <Table>
                            <thead>
                                <tr>
                                    <th>{texts.affectedOf}: </th>
                                </tr>
                            </thead>
                            <TableBody>
                                <TableRow>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div>
                    <div className="hotel-container">
                        <h2>{texts.hotel}</h2>
                        <div className="HotelTable">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <h3> {texts.fromDate} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.toDate} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.location} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.hotel} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.cost} </h3>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key="">
                                        <TableCell>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label={texts.timeOfHotel}
                                                    value={timeOfHotel}
                                                    onChange={handleDateChange}
                                                    format="YYYY-MM-DDTHH:mm"
                                                />
                                            </LocalizationProvider>
                                        </TableCell>
                                        <TableCell>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label={texts.timeOfHotel}
                                                    value={timeOfHotel}
                                                    onChange={handleDateChange}
                                                    format="YYYY-MM-DDTHH:mm"
                                                />
                                            </LocalizationProvider>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Sted"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Hotell"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Kostnad"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="transport-container">
                        <h2>{texts.transport}</h2>
                        <div className="TransportTable">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <h3> {texts.date} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.type} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.fromDate} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.toDate} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.cost} </h3>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key="">
                                        <TableCell>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label={texts.timeOfTransport}
                                                    value={timeOfTransport}
                                                    onChange={handleDateChange}
                                                    format="YYYY-MM-DDTHH:mm"
                                                />
                                            </LocalizationProvider>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Type"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Fra"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Til"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Kostnad"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="funeral-container">
                        <h2>{texts.funeral}</h2>
                        <div className="FuneralTable">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <h3> {texts.date} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.location} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.regards} </h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3> {texts.cost} </h3>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key="">
                                        <TableCell>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label={texts.timeOfFuneral}
                                                    value={timeOfFuneral}
                                                    onChange={handleDateChange}
                                                    format="YYYY-MM-DDTHH:mm"
                                                />
                                            </LocalizationProvider>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Sted"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Oppmerksomhet"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined"
                                                label="Kostnad"
                                                multiline
                                                onChange={(event) =>
                                                    setDescriptionValue(event.target.value)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
                <h2>{texts.followUp}</h2>
                <TextField
                    className="description-textfield"
                    id="outlined"
                    label="Tekst her"
                    multiline
                    rows={7}
                    style={{ width: "100%" }}
                    onChange={(event) => setDescriptionValue(event.target.value)}
                />

                <div>
                    <h2>{texts.uploadInvoice}</h2>
                    <Button
                        id="btn"
                        style={{ backgroundColor: "#369E3B", color: "black" }}
                        type="button"
                    >
                        {texts.uploadInvoice}
                    </Button>
                </div>
            </div>
            <Link to="/test">{texts.back}</Link>
        </DefaultContainer>
    );
};

export default AffectedInformation;
