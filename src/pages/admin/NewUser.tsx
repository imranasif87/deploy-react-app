import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import en from "../../languages/en.json";
import no from "../../languages/no.json";
import DefaultContainer from "../../layout/DefaultContainer";
import { User } from "../models/User";

interface Props {
  navHeader: string;
}

const NewUser: FunctionComponent<Props> = (props) => {
  const { navHeader } = props;

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );
  const texts = language === "en" ? en.user : no.user;

  const [user, setUser] = useState<User>({
    person: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    isAdmin: false,
    role: 0,
    password: "Bruker123",
  });

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("Brukeren ble opprettet");
      } else {
        alert("Noe galt skjedde. Vennligst prøv igjen");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      person: {
        ...prevUser.person,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      {texts ? (
        <DefaultContainer
          navHeader={texts.newUser}
          onLanguageChange={handleLanguageChange}
        >
          <form onSubmit={handleSubmit}>
            <div className="user-info-container">
              <table>
                <tbody>
                  <tr>
                    <th>{texts.firstName}</th>
                    <td>
                      <input
                        type="text"
                        name="firstName"
                        value={user.person.firstName}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>{texts.lastName}</th>
                    <td>
                      <input
                        type="text"
                        name="lastName"
                        value={user.person.lastName}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>{texts.email}</th>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={user.person.email}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>{texts.phone}</th>
                    <td>
                      <input
                        type="phone"
                        name="phone"
                        value={user.person.phone}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>{texts.role}</th>
                    <td>
                      <input
                        type="role"
                        name="role"
                        value={user.person.role}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="change-password-link-container">
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
                  {texts.confirmNewUser}{" "}
                </Button>
              </div>
            </div>
          </form>
        </DefaultContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewUser;
