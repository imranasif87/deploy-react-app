import React, { FunctionComponent, useState, useEffect } from "react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, AlertTitle } from "@mui/material";

interface FormData {
  Person: string;
  IsAdmin: Boolean;
  Role: string;
  Password: string;
}

interface Props {
  formData: FormData;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  navigate: any;
}

const ResetPasswordForm: FunctionComponent<Props> = (props) => {
  const { formData, onPasswordChange, onSubmit } = props;
  const { Person, IsAdmin, Role, Password } = formData;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    onPasswordChange(event);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const passwordsMatch = Password === confirmPassword;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setFormSubmitted(true);
      props.navigate("/login");
    } else {
      setShowErrorMessage("Passwords do not match.");
    }
    onSubmit(event);
  };

  return (
    <div className="login-form">
      <div>
        <h1>Nytt passord</h1>
      </div>
      <form className="form__resetPassword" onSubmit={handleSubmit}>
        <div className="form__resetPassword__column">
          <label htmlFor="Password">Nytt passord</label>
          <br />
          <FormControl variant="outlined" sx={{ width: "300px" }}>
            <OutlinedInput
              id="Password"
              name="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Nytt passord"
              size="small"
              style={{
                width: "300px",
                backgroundColor: "white",
              }}
              onChange={handlePasswordChange}
              inputProps={{
                pattern: "^(?=.*\\d{2,})(?=.*[A-Z]).{2,31}$",
                maxLength: 31,
                required: true,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div />
          <div className="form__resetPassword__column">
            <label htmlFor="ConfirmPassword">Bekreft passord</label>
            <br />

            <FormControl variant="outlined" sx={{ width: "300px" }}>
              <OutlinedInput
                style={{ width: "300px",  backgroundColor: "white" }}
                className="input-password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Bekreft passord"
                size="small"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                inputProps={{
                  pattern: "^(?=.*\\d{2,})(?=.*[A-Z]).{2,31}$",
                  maxLength: 31,
                  required: true,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {showErrorMessage && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {showErrorMessage}
              </Alert>
            )}
          </div>
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
          disabled={!passwordsMatch}
        >
          Bekreft passord
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
