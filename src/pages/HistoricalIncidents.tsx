import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TextField,
} from "@mui/material";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

interface Data {
  id: number;
  flight: {
    flightNumber: string;
  };
  createdAt: Date;
  timeOfIncident: Date;
  description: string;
  isActive: boolean;
}

const PAGE_SIZE = 10;

const HistoricalIncidents: FunctionComponent<Props> = (props) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [data, setData] = useState<Incident[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
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

  const handleSort = (property: keyof Data) => {
    const newData = [...data].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
    setData(newData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const visibleData = data.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );

  // TODO: Fungerer ikke lenger
  const filteredData = visibleData.filter(
    (item) =>
      item.flight.flightNumber &&
      item.flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <DefaultContainer
      navHeader={texts.historicalIncidents}
      onLanguageChange={handleLanguageChange}
    >
      <div className="SearchField">
        <TextField
          label={texts.search}
          variant="outlined"
          onChange={handleSearch}
        />
        <div className="IncidentTable">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={sortDirection}
                    onClick={() => handleSort("createdAt")}
                  >
                    <h3> {texts.createdAt} </h3>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={sortDirection}
                    onClick={() => handleSort("flightNumber")}
                  >
                    <h3> {texts.flight} </h3>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={sortDirection}
                    onClick={() => handleSort("timeOfIncident")}
                  >
                    <h3> {texts.timeOfIncident} </h3>
                  </TableSortLabel>
                </TableCell>
                <TableCell style={{ width: "450px" }}>
                  <TableSortLabel
                    active={true}
                    direction={sortDirection}
                    onClick={() => handleSort("description")}
                  >
                    <h3> {texts.description} </h3>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleData
                .filter((item) => !item.isActive)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    component={Link}
                    to={`/Incident/${item.id}`}
                  >
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>{item.flight?.flightNumber || "Null"}</TableCell>
                    <TableCell>{item.timeOfIncident}</TableCell>
                    <TableCell component="div">{item.description}</TableCell>
                  </TableRow>
                ))}
              {visibleData.filter((item) => item).length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}> {texts.notFound}</TableCell>
                </TableRow>
              )}
            </TableBody>
            {visibleData.length > PAGE_SIZE && (
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
            )}
          </Table>
        </div>
      </div>
    </DefaultContainer>
  );
};

export default HistoricalIncidents;
