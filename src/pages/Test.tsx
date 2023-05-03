// TODO: Endre navn. Fikse utseendet
import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Table, TableRow, TableCell, TableBody } from "@mui/material";
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

const HRKtest: FunctionComponent<Props> = (props) => {
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

  const { id } = useParams();

  // TODO: Må legge inn forskjell på aktive hendelser og historiske hendelser.
  const fetchIncidentData = () => {
    fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${id}`)
      //fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/132")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    fetchIncidentData();
  }, [id]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO");
  };

  return (
    <>
      <DefaultContainer
        navHeader={texts.activeIncident}
        onLanguageChange={handleLanguageChange}
      >
        <div className="App">
          <header className="App-header">
            <h1>{texts.activeIncident}</h1>
            <div>
              <Button
                id="addincident"
                component={Link}
                to={`/Incident/${data.id}`}
                variant="text"
                style={{
                  width: 1000,
                  padding: "5px !important",
                  height: "auto",
                  backgroundColor: "#369E3B",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>{texts.description}</TableCell>
                      <TableCell>{data.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {texts.flight}: {data?.flight?.flightNumber}
                      </TableCell>
                      <TableCell>
                        {texts.airline}: {data?.flight?.airline}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {texts.departure}:{" "}
                        {formatTime(data?.flight?.departureTime)}
                      </TableCell>
                      <TableCell>
                        {texts.arrival}: {formatTime(data?.flight?.arrivalTime)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {texts.origin}: {data?.flight?.origin}
                      </TableCell>
                      <TableCell>
                        {texts.destination}: {data?.flight?.destination}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{texts.seatCapacity}</TableCell>
                      <TableCell>{data?.flight?.seatCapacity}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Button>
            </div>

            <div id="buttons">
              <Button
                id="affected"
                component={Link}
                to="/Passengers"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.passengers}{" "}
              </Button>
              <Button
                id="incidents"
                component={Link}
                to="/Affected"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.affected}{" "}
              </Button>
              <Button
                id="liason"
                component={Link}
                to="/Liason"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.liason}{" "}
              </Button>
            </div>

            <div id="buttons">
              <Button
                id="management_support"
                component={Link}
                to="/ManagementSupport"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.managementSupport}{" "}
              </Button>
              <Button
                id="crew"
                component={Link}
                to="/Crew"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.crew}{" "}
              </Button>
              <Button
                id="newincident"
                component={Link}
                to="/InformationToAffected"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.informationToAffected}
              </Button>
            </div>

            <div id="buttons">
              <Button
                id="statistics"
                component={Link}
                to="/Statistics"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.statistics}{" "}
              </Button>
              <Button
                id="evaluation"
                component={Link}
                to="/Evaluation"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.evaluation}{" "}
              </Button>
              <Button
                id="no_match"
                component={Link}
                to="/NoMatch"
                variant="text"
                style={{
                  width: 320,
                  height: 100,
                  backgroundColor: "#369E3B",
                  color: "black",
                }}
              >
                {texts.noMatch}{" "}
              </Button>
            </div>

            <Link to="/HRK_controlpanel">{texts.back}</Link>
          </header>
        </div>
      </DefaultContainer>
    </>
  );
};

export default HRKtest;
