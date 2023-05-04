import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

interface Props {
    navHeader: string;
}

interface Data {
    id: number;
    createdAt: string;
    timeOfIncident: string;
    flight: {
        id: number;
        flightNumber: string;
        origin: string;
        departureTime: string;
        destination: string;
        arrivalTime: string;
        seatCapacity: number;
        price: string;
        airline: string;
    };
    description: string;
}

const InitialContact_controlpanel: FunctionComponent<Props> = (props) => {
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.controlpanel : no.controlpanel;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const [data, setData] = useState<Data>({
        id: 0,
        createdAt: "",
        timeOfIncident: "",
        flight: {
            id: 0,
            flightNumber: "",
            origin: "",
            departureTime: "",
            destination: "",
            arrivalTime: "",
            seatCapacity: 0,
            price: "",
            airline: "",
        },
        description: "",
    });

    return (
        <DefaultContainer
            navHeader={texts.title}
            onLanguageChange={handleLanguageChange}
        >
            <div className="App">
                <header className="App-header">
                    <h1>{texts.title}</h1>
                    <div id="sharepoint">
                        <Button
                            component={Link}
                            to="https://www.microsoft.com/nb-no/microsoft-365/sharepoint"
                            style={{ backgroundColor: "#369E3B" }}
                        >
                            {texts.sharepoint}{" "}
                        </Button>
                    </div>

                    <div id="buttons">
                        <Button
                            id="newincident"
                            component={Link}
                            to={`/ActiveIncidents`}
                            style={{
                                width: "45%",
                                aspectRatio: "4 / 3",
                                backgroundColor: "#369E3B",
                            }}
                        >
                            {texts.activeIncident}
                        </Button>
                        <Button
                            id="incidents"
                            component={Link}
                            to="/HistoricalIncidents"
                            style={{
                                width: "45%",
                                aspectRatio: "4 / 3",
                                backgroundColor: "#369E3B",
                            }}
                        >
                            {texts.historicalIncidents}{" "}
                        </Button>
                    </div>
                </header>
            </div>
        </DefaultContainer>
    );
};

export default InitialContact_controlpanel;
