import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/AddFlight.css";

interface Props {
  navHeader: string;
}

interface Flight {
  flightNumber: string;
  origin: string;
  departureTime: dayjs.Dayjs;
  destination: string;
  arrivalTime: dayjs.Dayjs;
  seatCapacity: number;
  price: number;
  airline: string;
}

const AddFlight: React.FunctionComponent<Props> = (props) => {
  const [flight, setFlight] = useState<Flight>({
    flightNumber: "",
    origin: "",
    departureTime: dayjs(),
    destination: "",
    arrivalTime: dayjs(),
    seatCapacity: 0,
    price: 0,
    airline: "",
  });

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );
  const texts = language === "en" ? en.incident : no.incident;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFlight((prevFlight) => ({ ...prevFlight, [name]: value }));
  };

  const handleDateChange = (key: keyof Flight, value: Date | null) => {
    if (value) {
      setFlight((prevFlight) => ({
        ...prevFlight,
        [key]: dayjs(value),
      }));
    }
  };

  const navigate = useNavigate();

  const onAddFlight = async (flightData: Flight) => {
    try {
      const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Flight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightData),
      });
      navigate("/AddIncident");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    onAddFlight(flight);
  };

  // TODO: Kunne legge inn klokkeslett
  return (
    <DefaultContainer
      navHeader={texts.newFlight}
      onLanguageChange={handleLanguageChange}
    >
      <div className="App">
        <div className="container">
          <div className="row">
            <TextField
              id="flightNumber"
              label={texts.flight}
              name="flightNumber"
              value={flight.flightNumber}
              onChange={handleChange}
            />

            <TextField
              id="airline"
              label={texts.airline}
              name="airline"
              value={flight.airline}
              onChange={handleChange}
            />
            <TextField
              id="origin"
              label={texts.origin}
              name="origin"
              value={flight.origin}
              onChange={handleChange}
            />

            <TextField
              id="destination"
              label={texts.destination}
              name="destination"
              value={flight.destination}
              onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={texts.departure}
                value={flight.departureTime}
                onChange={(value) => handleDateChange("departureTime", value?.toDate() ?? null)
              }
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={texts.arrival}
                value={flight.arrivalTime}
                onChange={(value) => handleDateChange("arrivalTime", value?.toDate() ?? null)
              }
              />
            </LocalizationProvider>

            <TextField
              id="seatCapacity"
              label={texts.seatCapacity}
              name="seatCapacity"
              type="number"
              value={flight.seatCapacity}
              onChange={handleChange}
            />

            <TextField
              id="price"
              label={texts.price}
              name="price"
              value={flight.price}
              onChange={handleChange}
            />

            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#369E3B",
                color: "black",
                width: "204%",
              }}
              type="button"
            >
              {texts.newFlight}
            </Button>
          </div>
        </div>
      </div>
    </DefaultContainer>
  );
};

export default AddFlight;
