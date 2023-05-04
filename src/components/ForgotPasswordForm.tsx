import React, { FunctionComponent, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

interface FormData {
    Person: string;
    IsAdmin: Boolean;
    Role: string;
    Password: string;
}

interface Props {
    formData: FormData;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        regexRemove?: RegExp
    ) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ForgotPasswordForm: FunctionComponent<Props> = (props) => {
    const { formData, onChange, onSubmit } = props;
    const { Person, IsAdmin, Role, Password } = formData;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //await sendEmail(Person, Password);
            console.log("Email sent successfully");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-form">
            <div>
                <h1>Glemt passord?</h1>
            </div>
            <form className="form__login" onSubmit={handleSubmit}>
                <div className="form__login__column">
                    <label htmlFor="Person">E-post</label>
                    <br />

                    <TextField
                        style={{ width: "300px", backgroundColor: "white" }}
                        className="input-email"
                        id="Person"
                        name="Person"
                        type="email"
                        placeholder="E-post"
                        size="small"
                        value={Person}
                        onChange={(e) => onChange}
                        inputProps={{
                            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                            required: true,
                        }}
                    />
                    <div></div>
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
                    Send nytt passord
                </Button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
