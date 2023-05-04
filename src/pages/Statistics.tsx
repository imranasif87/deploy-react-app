import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import en from "../languages/en.json";
import no from "../languages/no.json";
import { handleDownloadReportPassenger } from "../components/PDF/PDFPassenger";
import { handleDownloadReportCrew } from "../components/PDF/PDFCrew";
import { handleDownloadReportAffected } from "../components/PDF/PDFAffected";
import DefaultContainer from "../layout/DefaultContainer";
import "./css/Statistics.css";

// Define the structure of the Soul, Affected and Option data
interface SoulData {
    id: number;
    type: number;
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

interface AffectedData {
    id: number;
    person: {
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
    };
}

interface Option {
    label: string;
    aliases: string[];
}

// Define constants for the menu options and define menu props
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Statistics: FunctionComponent<any> = (props) => {
    // Define state variables for the component
    const [selectedOption, setSelectedOption] = useState("");
    const [affectedList, setAffectedList] = useState<any>([]);
    const [passengerList, setPassengerList] = useState<any>([]);
    const [crewList, setCrewList] = useState<any>([]);

    // Handle changes to the language
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.statistics : no.statistics;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    // Define the options for the menu
    const options: Option[] = [
        { label: "passengers", aliases: [texts.passengers] },
        { label: "crew", aliases: [texts.crew] },
        { label: "affected", aliases: [texts.affected] },
    ];

    const handleOptionChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedOption(event.target.value);

        if (event.target.value === "passengers") {
            try {
                const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul");
                const data = await response.json();
                if (Array.isArray(data)) {
                    const passengers = data
                        .filter((soul: any) => soul.type === 0)
                        .map((soul: any) => {
                            return {
                                id: soul.id,
                                person: {
                                    firstName: soul.person.firstName,
                                    lastName: soul.person.lastName,
                                    email: soul.person.email,
                                    phone: soul.person.phone,
                                },
                            };
                        });
                    setPassengerList(passengers);
                } else {
                    setPassengerList([]);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (event.target.value === "affected") {
            try {
                const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected");
                const data = await response.json();
                if (Array.isArray(data)) {
                    const affected = data.map((affected: any) => {
                        return {
                            id: affected.id,
                            person: {
                                firstName: affected.person.firstName,
                                lastName: affected.person.lastName,
                                email: affected.person.email,
                                phone: affected.person.phone,
                            },
                        };
                    });
                    setAffectedList(affected);
                } else {
                    setAffectedList([]);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (event.target.value === "crew") {
            try {
                const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul");
                const data = await response.json();
                if (Array.isArray(data)) {
                    const crew = data
                        .filter((soul: any) => soul.type === 1)
                        .map((soul: any) => {
                            return {
                                id: soul.id,
                                person: {
                                    firstName: soul.person.firstName,
                                    lastName: soul.person.lastName,
                                    email: soul.person.email,
                                    phone: soul.person.phone,
                                },
                            };
                        });
                    setCrewList(crew);
                } else {
                    setCrewList([]);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <DefaultContainer
            navHeader={texts.title}
            onLanguageChange={handleLanguageChange}
        >
            <div className="Statistics">
                <header className="App-header">
                    <h1>{texts.title} </h1>
                </header>
                <br />

                <div className="SelectStatistics">
                    <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                        <InputLabel id="select-label">{texts.select}</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={selectedOption}
                            onChange={(e: any) => handleOptionChange(e)}
                            input={<OutlinedInput />}
                            MenuProps={MenuProps}
                        >
                            <MenuItem disabled value="">
                                <em>{texts.select}</em>
                            </MenuItem>
                            {options.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                    {option.aliases}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    {selectedOption === "affected" && (
                        <div>
                            <h2>{texts.selectedAffected}</h2>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <h3>{texts.id}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.firstName}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.lastName}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.email}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.phone}</h3>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {affectedList.map((affected: AffectedData) => (
                                        <TableRow key={affected.id}>
                                            <TableCell>{affected.id}</TableCell>
                                            <TableCell>{affected.person.firstName}</TableCell>
                                            <TableCell>{affected.person.lastName}</TableCell>
                                            <TableCell>{affected.person.email || "-"}</TableCell>
                                            <TableCell>{affected.person.phone || "-"}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() =>
                                                        handleDownloadReportAffected(
                                                            affected.id,
                                                            affectedList
                                                        )
                                                    }
                                                    variant="contained"
                                                    style={{ width: "200px", backgroundColor: "#00602C" }}
                                                    sx={{
                                                        ":hover": { backgroundColor: "#369E3B" },
                                                        margin: 1,
                                                    }}
                                                >
                                                    {texts.download}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {selectedOption === "passengers" && (
                        <div>
                            <h2>Du har valgt passasjerer</h2>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <h3>{texts.id}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.firstName}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.lastName}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.email}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.phone}</h3>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {passengerList.map((soul: any) => (
                                        <TableRow key={soul.Id}>
                                            <TableCell>{soul.id}</TableCell>
                                            <TableCell>{soul.person.firstName}</TableCell>
                                            <TableCell>{soul.person.lastName}</TableCell>
                                            <TableCell>{soul.person.email}</TableCell>
                                            <TableCell>{soul.person.phone}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() =>
                                                        handleDownloadReportPassenger(
                                                            soul.id,
                                                            passengerList
                                                        )
                                                    }
                                                    variant="contained"
                                                    style={{ width: "200px", backgroundColor: "#00602C" }}
                                                    sx={{
                                                        ":hover": { backgroundColor: "#369E3B" },
                                                        margin: 1,
                                                    }}
                                                >
                                                    {texts.download}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {selectedOption === "crew" && (
                        <div>
                            <h2>Du har valgt ansatte</h2>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <h3>{texts.id}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.firstName}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.lastName}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.email}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3>{texts.phone}</h3>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {crewList.map((soul: any) => (
                                        <TableRow key={soul.Id}>
                                            <TableCell>{soul.id}</TableCell>
                                            <TableCell>{soul.person.firstName}</TableCell>
                                            <TableCell>{soul.person.lastName}</TableCell>
                                            <TableCell>{soul.person.email}</TableCell>
                                            <TableCell>{soul.person.phone}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() =>
                                                        handleDownloadReportCrew(soul.id, crewList)
                                                    }
                                                    variant="contained"
                                                    style={{ width: "200px", backgroundColor: "#00602C" }}
                                                    sx={{
                                                        ":hover": { backgroundColor: "#369E3B" },
                                                        margin: 1,
                                                    }}
                                                >
                                                    {texts.download}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            <div className="Link">
                <Link to="/test">{texts.back}</Link>
            </div>
        </DefaultContainer>
    );
};

export default Statistics;
