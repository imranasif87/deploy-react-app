import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

const HRK_controlpanel: FunctionComponent<Props> = (props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );
  const texts = language === "en" ? en.controlpanel : no.controlpanel;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <DefaultContainer
      navHeader={texts.title}
      onLanguageChange={handleLanguageChange}
    >
      <div className="App">
        <header className="App-header">
          <h1>{texts.title} </h1>
          <div id="sharepoint">
            <Button
              component={Link}
              to="https://www.microsoft.com/nb-no/microsoft-365/sharepoint"
              variant="elevated"
              style={{ backgroundColor: "#369E3B" }}
            >
              {texts.sharepoint}{" "}
            </Button>
          </div>
          <div id="incaseit">
            <Button
              component={Link}
              to="https://login.incaseit.net/"
              variant="elevated"
              style={{ backgroundColor: "#369E3B" }}
            >
              {texts.incaseit}
            </Button>{" "}
          </div>

          <div id="buttons">
            <Button
              id="addincident"
              component={Link}
              to="/AddIncident"
              variant="elevated"
              style={{
                width: "45%",
                aspectRatio: "4 / 3",
                backgroundColor: "#369E3B",
              }}
            >
              {texts.incident}{" "}
            </Button>
            <Button
              id="incidents"
              component={Link}
              to="/HistoricalIncidents"
              variant="elevated"
              style={{
                width: "45%",
                aspectRatio: "4 / 3",
                backgroundColor: "#369E3B",
              }}
            >
              {texts.historicalIncidents}{" "}
            </Button>
            <Button
              id="newincident"
              component={Link}
              to="/ActiveIncidents"
              variant="elevated"
              style={{
                width: "45%",
                aspectRatio: "4 / 3",
                backgroundColor: "#369E3B",
              }}
            >
              {texts.activeIncident}
            </Button>
          </div>
        </header>
      </div>
    </DefaultContainer>
  );
};

export default HRK_controlpanel;
