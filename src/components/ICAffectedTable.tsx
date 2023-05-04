import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "./css/ICTable.css";

import React, { FunctionComponent, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface DataRow {
  firstName: string;
  lastName: string;
  relation: string;
  address: string;
  city: string;
  postNumber: string;
  phone: string;
  email: string;
  affectedOf: string;
}

interface Props {
  affectedRows: DataRow[];
  onDeleteRow: (row: DataRow, id: number) => void;
  onEditRow: (row: DataRow, id: number) => void;
}

const ICAffectedTable: FunctionComponent<Props> = (props) => {
  const { affectedRows, onDeleteRow, onEditRow } = props;

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
      name: "Relasjon (Hen er min: ...)",
      selector: (row) => row.relation,
      grow: 2,
      allowOverflow: false,
      wrap: true,
      minWidth: "41px",
    },
    {
      name: "Adresse",
      selector: (row) => row.address,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Sted/by",
      selector: (row) => row.city,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Postnr.",
      selector: (row) => row.postNumber,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Telefonnummer",
      selector: (row) => row.phone,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Epost",
      selector: (row) => row.email,
      grow: 2,
      wrap: true,
      compact: true,
      minWidth: "41px",
    },
    {
      name: "Pårørende av",
      selector: (row) => row.affectedOf,
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
      allowOverflow: false,
      ignoreRowClick: true,
      compact: true,
      maxWidth: "90px",
      minWidth: "80px",
    },
  ];

  return (
    <DataTable title="Pårørende:" columns={columns} data={affectedRows} dense />
  );
};

export default ICAffectedTable;
