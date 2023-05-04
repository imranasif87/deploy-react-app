import React, { useState, useEffect, FunctionComponent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

interface Props {
  navHeader: string;
}

const flight = [
  {
    value: "",
    label: "Velg flight her",
  },
];

interface Flight {
  id: number;
  flightNumber: string;
  origin: string;
  departureTime: string;
  destination: string;
  arrivalTime: string;
  seatCapacity: number;
  price: string;
  airline: string;
}

const AddIncident: FunctionComponent<Props> = (props) => {
  const [flightValue, setFlightValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [flights, setFlight] = useState<Flight | null>(null);
  const [flightOptions, setFlightOptions] = useState<Array<{ id: number; value: string; label: string }>>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );
  const texts = language === "en" ? en.incident : no.incident;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const [timeOfIncident, setTimeOfIncident] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setTimeOfIncident(date);
  };

  useEffect(() => {
    async function fetchFlight() {
      const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Flight");
      const data = await response.json();
      const options = data.map((flight: { id: any; flightNumber: any; }) => ({
        id: flight.id,
        value: flight.id,
        label: flight.flightNumber,
      }));
      setFlight(options);
      setFlightOptions(options);
    }
    fetchFlight();
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const selectedFlight = flightOptions.find(
      (option) => option.value === flightValue
    );
    const validationErrors: { [key: string]: string } = {};

    if (!flightValue) {
      validationErrors.flight = "Legg inn Flight";
    }

    if (!descriptionValue) {
      validationErrors.description = "Legg inn beskrivelse";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (selectedFlight) {
      const response = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${selectedFlight.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flight: flightValue,
            createdAt: new Date(),
            timeOfIncident: timeOfIncident,
            description: descriptionValue,
          }),
        }
      );
      navigate('/ActiveIncidents');
    }
  }

  // TODO: Fiks Link.
  return (
    <DefaultContainer
      navHeader={texts.title}
      onLanguageChange={handleLanguageChange}
    >
      <div className="App">
        <header className="App-header">
          <h1>{texts.title}</h1>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { margin: "15px", width: "600px" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-flight"
                select
                label={texts.selectFlight}
                value={flightValue}
                onChange={(event) => setFlightValue(event.target.value)}
                error={errors.flight !== undefined}
                helperText={errors.flight}
                children={
                  flightOptions &&
                  flightOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                }
              />
              <div>
                <Link to={`/AddFlight`}>{texts.newFlight}</Link>
              </div>

              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={texts.timeOfIncident}
                    value={timeOfIncident}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
                <div />
              </div>

              <div id="description">
                <TextField
                  id="outlined-multiline-static"
                  label={texts.descriptionOfIncident}
                  multiline
                  rows={10}
                  value={descriptionValue}
                  onChange={(event) => setDescriptionValue(event.target.value)}
                  error={errors.description !== undefined}
                  helperText={errors.description}
                />
              </div>

              <div>
                <Button
                  id="addincidentHRK"
                  onClick={handleSubmit}
                  style={{ backgroundColor: "#369E3B", color: "black" }}
                  type="button"
                >
                  {texts.register}
                </Button>
              </div>
            </div>
          </Box>
        </header>
      </div>
    </DefaultContainer>
  );
};

export default AddIncident;
