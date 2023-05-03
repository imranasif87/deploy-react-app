import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, TableRow, TableCell, TableBody, Button } from "@mui/material";
import DefaultContainer from "../layout/DefaultContainer";
import "./css/Controlpanel.css";

// Define the shape of a "Soul" object
interface Soul {
  id: number;
  type: string;
  isConfirmed: boolean;
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

// Define the shape of the URL parameters
interface Params {
  id: string;
}

// Define the component
const SoulInformation: FunctionComponent = () => {
  // Define state for the Soul object
  const [data, setData] = useState<Soul>({
    id: 0,
    person: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    type: "",
    isConfirmed: false,
  });

  // Get the URL parameters
  const { id } = useParams<Params>();

  // Fetch the data for the specified Soul object
  const fetchSoulData = (id: string) => {
    fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched data
        setData({
          id: data.id,
          person: {
            firstName: data.person.firstName,
            lastName: data.person.lastName,
            phone: data.person.phone,
            email: data.person.email,
          },
          type: data.type,
          flight: data.flight,
          isConfirmed: data.isConfirmed,
        });
      });
  };

  // Fetch the data when the component mounts or when the URL parameters change
  useEffect(() => {
    fetchSoulData(id);
  }, [id]);

  // Format the full name of a person
  const formatName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  return (
    <DefaultContainer navHeader="Soul Information">
      <h1></h1>
      <div className="App">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{data.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>
                {formatName(data.person.firstName, data.person.lastName)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>{data.person.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{data.person.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>{data.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Flight</TableCell>
              <TableCell>
                {data.flight ? data.flight.flightNumber : "N/A"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Confirmed</TableCell>
              <TableCell>{data.isConfirmed ? "Yes" : "No"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
        >
          Tilbake
        </Button>
      </div>
    </DefaultContainer>
  );
};

export default SoulInformation;
