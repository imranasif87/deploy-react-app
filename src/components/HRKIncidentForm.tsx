import React, { FunctionComponent } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface FormData {
    flight: string;
    description: string;
}

interface Props {
    formData: FormData;
    flightOptions: { value: string; label: string }[];
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        regexRemove?: RegExp
    ) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    errors: { [key: string]: string };
}

const HRKIncidentForm: FunctionComponent<Props> = (props) => {
    const { formData, flightOptions, onChange, onSubmit, errors } = props;
    const { flight, description } = formData;

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { margin: "15px", width: "600px" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <div>
                <TextField
                    id="outlined-select-flight"
                    select
                    label="Velg flight"
                    name="flight"
                    value={flight || ""}
                    onChange={onChange}
                    error={Boolean(errors["flight"])}
                    helperText={errors["flight"]}
                >
                    {flightOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <div id="description">
                    <TextField
                        id="outlined-multiline-static"
                        label="Legg inn beskrivelse av hendelsen her"
                        multiline
                        rows={10}
                        name="description"
                        value={description}
                        onChange={onChange}
                        error={Boolean(errors["description"])}
                        helperText={errors["description"]}
                    />
                </div>

                <div>
                    <Button
                        id="addincidentHRK"
                        style={{ backgroundColor: "#369E3B" }}
                        type="button"
                        onClick={() => onSubmit}
                    >
                        Registrer hendelse
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default HRKIncidentForm;
