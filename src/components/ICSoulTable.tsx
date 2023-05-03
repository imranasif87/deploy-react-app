import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "./css/ICTable.css";

import React, { FunctionComponent } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface DataRow {
  soulId: number;
  firstName: string;
  lastName: string;
  flightId: number;
  origin: string;
  destination: string;
  departureTime: string;
  airline: string;
}

interface Props {
  soulRows: DataRow[];
  onDeleteRow: (row: DataRow, id: number) => void;
  onEditRow: (row: DataRow, id: number) => void;
}

const ICSoulTable: FunctionComponent<Props> = (props) => {
  const { soulRows, onDeleteRow, onEditRow } = props;

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Fornavn",
      selector: (row) => row.firstName,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Etternavn",
      selector: (row) => row.lastName,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Avgang fra",
      selector: (row) => row.origin,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Ankomst til",
      selector: (row) => row.destination,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Avgangstid",
      selector: (row) => {
        const departureTime = new Date(row.departureTime);
        const locale = "no-nb";
        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        };

        return departureTime.toLocaleString(locale, options);
      },
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Selskap",
      selector: (row) => row.airline,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Rediger [Slett]",
      cell: (row, index) => (
        <>
          <IconButton aria-label="edit" onClick={() => onEditRow(row, index)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => onDeleteRow(row, index)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),

      grow: 1,
      wrap: true,
      ignoreRowClick: true,
      compact: true,
      maxWidth: "90px",
      minWidth: "80px",
    },
  ];

  return (
    <DataTable
      title="Passasjer(er):"
      columns={columns}
      data={soulRows}
      responsive={true}
      dense
    />
  );
};

export default ICSoulTable;
