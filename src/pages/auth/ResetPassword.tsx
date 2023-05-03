import React, { useState, FunctionComponent } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/negativ-logo-RGB-no-padding.png";
import "./../css/Login.css";
import ResetPasswordForm from "../../components/ResetPasswordForm";

const emptyFormData = {
  Person: "",
  Password: "",
};

const ResetPassword: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate(); // initialize useNavigate hook
  const [formData, setFormData] = useState(emptyFormData);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    regexRemove: RegExp = /$^/
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.replace(regexRemove, ""),
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    regexRemove: RegExp = /$^/
  ) => {
    setConfirmPassword(e.target.value.replace(regexRemove, ""));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.Password === confirmPassword) {
      try {
        // save password to database
        await savePasswordToDatabase(formData.Password);

        // reset form data and confirmation password
        setFormData(emptyFormData);
        setConfirmPassword("");

        // navigate to home page
        navigate("/");
      } catch (error) {
        // handle database error
      }
    } else {
      // handle password mismatch error
    }
  };

  return (
    <React.Fragment>
      <div id="login">
        <img className="navbar__img-item" src={logo} alt="Widerøe logo" />
        <div id="login-container">
          <form>
            <ResetPasswordForm
              formData={formData}
              onPasswordChange={handlePasswordChange}
              onConfirmPasswordChange={handleConfirmPasswordChange}
              onSubmit={onSubmit}
              navigate={navigate}
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
