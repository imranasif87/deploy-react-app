import React, { useState, FunctionComponent, useContext } from "react";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/negativ-logo-RGB-no-padding.png";
import "./../css/Login.css";
import LoginForm from "../../components/LoginForm";
import { AuthContext } from "./AuthContext";
import en from "../../languages/en.json";
import no from "../../languages/no.json";

const emptyFormData = {
    Person: {
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
    },
    IsAdmin: false,
    Role: "",
    Password: "",
};

const Login: FunctionComponent<any> = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<any>();

    const [language, setLanguage] = useState("no");
    const texts = language === "en" ? en.login : no.login;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [alert, setAlert] = useState<React.ReactNode>(null);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        regexRemove: RegExp = /$^/
    ) => {
        const { name, value } = e.target;
        setFormData((prevState: any) => ({
            ...prevState,
            Person: {
                ...prevState.Person,
                [name]: value,
            },
        }));
    };

    const checkUserExists = async (email: any, password: any) => {
        const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.Person.Email,
                password: formData.Person.Password,
            }),
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else if (response.status === 404) {
            return false;
        } else if (response.status === 401) {
            return false;
        } else {
            throw new Error("Unexpected error occurred");
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        const userExists = await checkUserExists(
            formData.Person.Email,
            formData.Person.Password
        );
        if (userExists) {
            handleLoginClick();
            setEmail(formData.Person.Email);
            setPassword(formData.Person.Password);
        } else {
            setAlert(
                <Alert severity="error">
                    Feil e-post eller passord. Vennligst prøv igjen.
                </Alert>
            );
        }
        setFormData(emptyFormData);
        setEmail(formData.Person.Email);
        setPassword(formData.Person.Password);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const { setIsAuthenticated } = useContext(AuthContext); // get setIsAuthenticated from AuthContext

    const handleLoginClick = async () => {
        const data = await checkUserExists(
            formData.Person.Email,
            formData.Person.Password
        );
        console.log("Token: ", data.token);
        if (data.token) {
            if (rememberMe) {
                localStorage.setItem("token", data.token);
            }
            localStorage.setItem("userId", data.userId);
            setIsAuthenticated(true);

            const response = await fetch(
                `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/${data.userId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );

            if (response.status === 200) {
                const { role } = await response.json();
                if (role === 0) {
                    navigate("/hrk_controlpanel");
                } else if (role === 1) {
                    navigate("/"); //
                } else {
                }
            } else {
                setAlert("Failed to get user details");
            }
        } else {
            setAlert("Ugyldig E-post eller passord");
        }
    };

    const handleForgotPasswordClick = () => {
        navigate("/ForgotPassword");
    };

    return (
        <React.Fragment>
            <div id="login">
                <img className="navbar__img-item" src={logo} alt="Widerøe logo" />
                <div id="login-container">
                    <LoginForm
                        formData={formData}
                        onChange={onChange}
                        onSubmit={onSubmit}
                    />
                </div>
                <Stack sx={{ width: "25%", margin: "10px" }} spacing={2}>
                    {alert}
                </Stack>
                <div
                    id="login-text"
                    style={{ display: "inline-block", textAlign: "left" }}
                >
                    <label>
                        {texts.remember}
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                    </label>
                    <br />
                    <span onClick={handleForgotPasswordClick}>Glemt passord?</span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
