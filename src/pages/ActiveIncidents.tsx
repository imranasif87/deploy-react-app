import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField, Grid } from "@mui/material";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Data = {
  id: number;
  flight: {
    flightNumber: string;
  };
  createdAt: string;
  timeOfIncident: string;
  description: string;
  isActive: boolean;
};

type IncidentCardProps = {
  incident: Data;
};

const PAGE_SIZE = 10;

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ActiveIncidents: FunctionComponent = (props) => {
  const [incidents, setIncidents] = useState([]);
  const [data, setData] = useState<Data[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );
  const texts = language === "en" ? en.incident : no.incident;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const IncidentCard = ({ incident }: IncidentCardProps) => {
    return (
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {texts.created}: {incident.createdAt.toLocaleString()}
          </Typography>
          <Typography variant="h5" component="div">
            {incident.flight?.flightNumber || "Null"}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {incident.timeOfIncident.toLocaleString()}
          </Typography>
          <Typography variant="body2">{incident.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/Test/${incident.id}`}>
            {texts.readMore}
          </Button>
        </CardActions>
      </Card>
    );
  };


  useEffect(() => {
    async function fetchIncident() {
      try {
        const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident");
        const data = await response.json();
        console.log(data);
        const incidents = data.map((incident: any) => ({
          id: incident.id,
          flight: {
            flightNumber: incident.flightNumber,
          },
          createdAt: new Date(incident.createdAt)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "."),
          timeOfIncident: new Date(incident.timeOfIncident)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "."),
          description: incident.description,
          isActive: incident.isActive,
        }));
        setIncidents(incidents);
        console.log(
          incidents[0].isActive,
          incidents[1].isActive,
          incidents[2].isActive
        );
      } catch (error) {
        console.error("Error while fetching incident data:", error);
      }
    }
    fetchIncident();
  }, []);

  useEffect(() => {
    if (incidents.length > 0) {
      setData(incidents);
    }
  }, [incidents]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  // TODO: Fungerer ikke lenger
  const filteredData = data.filter(
    (item) =>
      item.flight?.flightNumber &&
      item.flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const visibleData = data
    .filter((item) => item.isActive)
    .slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

  return (
    <DefaultContainer
      navHeader={texts.activeIncidents}
      onLanguageChange={handleLanguageChange}
    >
      <div className="SearchField">
        <TextField
          label={texts.search}
          variant="outlined"
          onChange={handleSearch}
          sx={{ marginBottom: "2%" }}
        />
        <div className="GridWrapper">
          <Grid container justifyContent="center" spacing={2}>
            {visibleData.map((incident) => (
              <Grid item key={incident.id} sx={{ width: "400px" }}>
                <IncidentCard incident={incident} />
              </Grid>
            ))}
          </Grid>
          {visibleData.filter((item) => item.isActive).length === 0 && (
            <Typography variant="body1"> {texts.notFound}</Typography>
          )}
        </div>

        {visibleData.length > PAGE_SIZE && (
          <div className="ButtonsWrapper">
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
          </div>
        )}
      </div>
    </DefaultContainer>
  );
};

export default ActiveIncidents;
