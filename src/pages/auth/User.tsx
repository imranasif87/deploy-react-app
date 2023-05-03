import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import CardContent from "../../layout/CardLayout";
import "./../css/UserTable.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "./AuthContext";
import en from "../../languages/en.json";
import no from "../../languages/no.json";
import DefaultContainer from "../../layout/DefaultContainer";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

interface Props {
  navHeader: string;
}

interface User {
  id: number;
  person: {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  };
  isAdmin: boolean;
  role: string;
}

const Home: FunctionComponent<Props> = (props) => {
  const { navHeader } = props;
  const { user, fetchUser } = useContext(AuthContext);

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );
  const texts = language === "en" ? en.user : no.user;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const getRoleName = (role: number): string => {
    return role === 0 ? "HRK-bruker" : "Førstekontakt";
  };

  return (
    <div>
      <DefaultContainer
        navHeader={texts.title}
        onLanguageChange={handleLanguageChange}
      >
        {user ? (
          <div className="user-info-container">
            <table>
              <tbody>
                <tr>
                  <th>
                    {" "}
                    <PersonIcon /> {texts.name}
                  </th>
                  <td>
                    {user.person.firstName} {user.person.lastName}
                  </td>
                </tr>
                <tr>
                  <th>
                    <EmailIcon /> {texts.email}
                  </th>
                  <td>{user.person.email || "-"}</td>
                </tr>
                <tr>
                  <th>
                    <CallIcon />
                    {texts.phone}
                  </th>
                  <td>{user.person.phone || "-"}</td>
                </tr>
                <tr>
                  <th>
                    <AdminPanelSettingsIcon /> {texts.admin}
                  </th>
                  <td>{user.isAdmin ? "Ja" : "Nei"}</td>
                </tr>
                <tr>
                  <th>
                    <PersonIcon /> {texts.role}{" "}
                  </th>
                  <td>{getRoleName(user.role)}</td>
                </tr>
              </tbody>
            </table>
            <div className="change-password-link-container">
              <Link to="/changePassword">
                <Button
                  style={{
                    width: "300px",
                    border: "1px solid white",
                    color: "white",
                    backgroundColor: "#00602C",
                  }}
                  sx={{ ":hover": { backgroundColor: "#369E3B" }, margin: 1 }}
                >
                  {texts.changePassword}{" "}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </DefaultContainer>
    </div>
  );
};

export default Home;
