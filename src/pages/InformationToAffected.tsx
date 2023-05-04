import * as React from "react";
import { FunctionComponent, useEffect, useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { Link } from "react-router-dom";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import PressReleaseForm from "../components/PressReleaseForm";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

const emptyPressReleaseFormData = {
    FlightId: 0,
    Description: "",
};

const InformationToAffected: FunctionComponent<any> = (props) => {
    const [pressReleaseData, setpressReleaseDat] = useState([]);
    const [formData, setFormData] = useState({
        FlightId: 0,
        Description: "",
    });
    const { setIsAuthenticated, user } = useContext(AuthContext);

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.incident : no.incident;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const fetchPressReleaseData = () => {
        fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/PressRelease/")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setpressReleaseDat(data);
            });
    };

    useEffect(() => {
        fetchPressReleaseData();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        await insertPressRelease(formData.FlightId, formData.Description);
        setFormData(emptyPressReleaseFormData);
    };

    const deletePressReleaseHandler = (id: any, e: any) => {
        e.preventDefault();
        let r = confirm("Are you sure?");
        if (r) {
            deletePressRelease(id);
        }
    };

    const deletePressRelease = async (pressReleaseId: any) => {
        const response = await fetch(
            `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/PressRelease/${pressReleaseId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            fetchPressReleaseData();
        } else if (response.status === 404) {
            return false;
        } else {
            throw new Error("Unexpected error occurred");
        }
    };

    const insertPressRelease = async (flightId: any, description: any) => {
        const response = await fetch(
            `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/PressRelease/${flightId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: description,
                }),
            }
        );

        if (response.status === 200) {
            fetchPressReleaseData();
        } else if (response.status === 404) {
            return false;
        } else {
            throw new Error("Unexpected error occurred");
        }
    };

    // TODO: Flight vises ikke
    // TODO: Legg inn modal, slett og endre pressemelding. Se på Passenger og Crew
    return (
        <DefaultContainer
            navHeader={texts.informationToAffected}
            onLanguageChange={handleLanguageChange}
        >
            <div className="App">
                <header className="App-header">
                    <h1>{texts.informationToAffected}</h1>

                    {user && user.role === "0" ? (
                        <PressReleaseForm
                            formData={formData}
                            onChange={onChange}
                            onSubmit={onSubmit}
                        />
                    ) : (
                        ""
                    )}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <h3>ID</h3>
                                </TableCell>
                                <TableCell>
                                    <h3>{texts.flight}</h3>
                                </TableCell>
                                <TableCell>
                                    <h3>{texts.description}</h3>
                                </TableCell>
                                <TableCell>
                                    <h3>{texts.createdAt}</h3>
                                </TableCell>
                                {user && user.role === "0" ? <TableCell></TableCell> : ""}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pressReleaseData.length > 0 ? (
                                pressReleaseData.map((item: any) => (
                                    <TableRow
                                        key={item.id}
                                        component={Link}
                                        to={`/pressrelease/${item.id}`}
                                    >
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.flight?.flightNumber}</TableCell>
                                        <TableCell component="div">{item.description}</TableCell>
                                        <TableCell>
                                            {new Date(item.createdAt).toLocaleDateString("en-GB")}
                                        </TableCell>
                                        {user.role === "0" ? (
                                            <TableCell>
                                                <span
                                                    style={{ cursor: "pointer", color: "red" }}
                                                    onClick={(e) => deletePressReleaseHandler(item.id, e)}
                                                >
                                                    {texts.delete}{" "}
                                                </span>
                                            </TableCell>
                                        ) : (
                                            ""
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>{texts.notFound}.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </header>
            </div>
            <Link to="/test">{texts.back}</Link>
        </DefaultContainer>
    );
};

export default InformationToAffected;
