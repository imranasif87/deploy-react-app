import React, { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import en from "../languages/en.json";
import no from "../languages/no.json";

interface FormData {
    FlightId: number;
    Description: string;
}

interface Props {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: FunctionComponent<Props> = (props) => {
    const { formData, onChange, onSubmit } = props;
    const { FlightId, Description } = formData;
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.incident : no.incident;

    const handleLanguageChange = (lang: any) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <div onChange={handleLanguageChange}>
            <div className="login-form">
                <div>
                    <h1>{texts.uploadPressRelease}</h1>
                </div>
                <form className="form__login" onSubmit={onSubmit}>
                    <div className="form__login__column">
                        <label htmlFor="FlightId">{texts.flightId}</label>
                        <br />
                        <TextField
                            style={{ width: "300px" }}
                            className="input-email"
                            id="FlightId"
                            name="FlightId"
                            type="text"
                            placeholder={texts.flightId}
                            onChange={onChange}
                            value={FlightId}
                            required
                        />
                    </div>
                    <div className="form__login__column">
                        <label htmlFor="Description">{texts.description}</label>
                        <br />
                        <TextField
                            style={{ width: "300px" }}
                            className="input-password"
                            id="Description"
                            name="Description"
                            placeholder={texts.description}
                            onChange={onChange}
                            value={Description}
                            type="text"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{
                            width: "300px",
                            border: "1px solid white",
                            color: "white",
                            backgroundColor: "#00602C",
                        }}
                        sx={{ ":hover": { backgroundColor: "#369E3B" }, margin: 1 }}
                    >
                        {texts.submit}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
