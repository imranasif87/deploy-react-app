import React, { useState, FunctionComponent } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/negativ-logo-RGB-no-padding.png";
import "./../css/Login.css";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";

const emptyFormData = {
  Person: "",
  IsAdmin: "",
  Role: "",
  Password: "",
};

//TODO: Fungerer ikke. Ikke mulig å sende mail
const ForgotPassword: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyFormData);

  const [email, setEmail] = useState("malenefikseth@hotmail.com");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    regexRemove: RegExp = /$^/
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.replace(regexRemove, ""),
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData(emptyFormData);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      "https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/15",
      //const response = await fetch(
      //"https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/password-reset",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(email);
  };

  return (
    <React.Fragment>
      <div id="login">
        <img className="navbar__img-item" src={logo} alt="Widerøe logo" />
        <div id="login-container">
          <ForgotPasswordForm
            formData={formData}
            onChange={onChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
