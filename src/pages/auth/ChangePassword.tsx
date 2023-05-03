import React, { useState, useEffect, useContext } from "react";
import NavBar from "../../layout/NavBar";
import DefaultContainer from "../../layout/DefaultContainer";
import { Button, TextField } from "@mui/material";
import "./../css/UserTable.css";
import en from "../../languages/en.json";
import no from "../../languages/no.json";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  navHeader: string;
}

//TODO: Fungerer ikke. Ikke mulig å skifte passord
const ChangePassword: FunctionComponent<Props> = (props) => {
  const { navHeader } = props;
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );
  const texts = language === "en" ? en.user : no.user;
  const { setIsAuthenticated, user } = useContext(AuthContext); // get setIsAuthenticated from AuthContext

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const sendEmail = (email: string, name: string) => {
    let emailData = {
      service_id: "service_lcddukl",
      template_id: "template_21klkxo",
      template_params: {
        to_name: name,
        reply_to: email,
        message: "Password has been changed",
      },
      user_id: "TsgkV-E_7SjUGc1QF",
    };

    fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailData,
      }),
    }).then((response) => {
      if (response.ok) {
        console.log("email sent.");
      } else {
        //alert(newPassword);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword === confirmNewPassword) {
      fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/${user.id}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      }).then((response) => {
        if (response.ok) {
          alert("Passordet ditt ble endert.");
          sendEmail(user.person.email);
          navigate("/user");
        } else {
          alert("Det oppstod en feil. Vennligst prøv igjen");
          //alert(newPassword);
        }
      });
    } else {
      alert("new and confirm password må være lik.");
    }
  };

  return (
    <DefaultContainer
      navHeader={texts.confirmChangePassword}
      onLanguageChange={handleLanguageChange}
    >
      <div id="changePassword">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>{texts.oldPassword} </th>
                <td>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>{texts.newPassword} </th>
                <td>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>{texts.confirmPassword} </th>
                <td>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(event) =>
                      setConfirmNewPassword(event.target.value)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            type="submit"
            style={{
              width: "300px",
              border: "1px solid white",
              color: "white",
              backgroundColor: "#00602C",
            }}
            sx={{ ":hover": { backgroundColor: "#369E3B" }, margin: 1 }}
          >
            {texts.confirmChangePassword}
          </Button>
        </form>
      </div>
    </DefaultContainer>
  );
};

export default ChangePassword;
