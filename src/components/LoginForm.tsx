import React, { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface FormData {
  Person: {
    FirstName: string;
    LastName: string;
    Email?: string;
    Phone?: string;
  };
  IsAdmin: boolean;
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

const LoginForm: FunctionComponent<Props> = (props) => {
  const { formData, onChange, onSubmit } = props;
  const { Email, IsAdmin, Role, Password } = formData;
  const [emailValue, setEmailValue] = useState<string | undefined>(Email);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    setEmailValue(Email);
  }, [Email]);

  return (
    <div className="login-form">
      <div>
        <h1>Logg inn</h1>
      </div>
      <form className="form__login" onSubmit={onSubmit}>
        <div className="form__login__column">
          <label htmlFor="Email">E-post</label>
          <br />
          <TextField
            style={{ width: "300px", backgroundColor: "white" }}
            className="input-email"
            id="Email"
            size="small"
            name="Email"
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              onChange(e);
            }}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
          />
          <div></div>
        </div>
        <div className="form__login__column">
          <label htmlFor="Password">Passord</label>
          <br />
          <FormControl variant="outlined">
            <InputLabel
              sx={{ width: "25ch" }}
              htmlFor="outlined-adornment-password"
            ></InputLabel>
            <OutlinedInput
              id="Password"
              type={showPassword ? "text" : "password"}
              style={{ width: "300px", backgroundColor: "white" }}
              className="input-password"
              name="Password"
              value={Password}
              onChange={onChange}
              pattern="^(?=.*\d{2,})(?=.*[A-Z]).{2,31}$"
              maxLength={31}
              required
              size="small"
              endAdornment={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
          </FormControl>
          <div />
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
          Logg inn
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
