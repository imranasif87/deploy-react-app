import React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../layout/NavBar";
import "./css/Controlpanel.css";
import logo from "../assets/images/logo/fjell.jpeg";
import { Button } from "@mui/material";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
    TextField,
} from "@mui/material";
import en from "../languages/en.json";
import no from "../languages/no.json";

interface Props {
    navHeader: string;
}

interface Data {
    id: number;
    description: string;
}

const HRKtest: FunctionComponent<Props> = (props) => {
    const [data, setData] = useState([]);

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
                setData(data);
            });
    };

    useEffect(() => {
        fetchPressReleaseData();
    }, []);

    return (
        <>
            <NavBar header={props.navHeader} onLanguageChange={(lang: any) => { }} userEmail='' />
            <div className="App">
                <header className="App-header">
                    <h1>{props.navHeader}</h1>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Flight Number</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 ? (
                                data.map((item: any) => (
                                    <TableRow>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.flight?.flightNumber}</TableCell>
                                        <TableCell component="div">{item.description}</TableCell>
                                        <TableCell>{item.createdAt}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>Fant ingen hendelser.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div>
                        <img src={logo} alt="Logo"></img>
                    </div>

                    <Link to="/HRK_controlpanel">Gå tilbake</Link>
                </header>
            </div>
        </>
    );
};

export default HRKtest;
