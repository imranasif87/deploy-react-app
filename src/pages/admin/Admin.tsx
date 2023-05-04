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
import { AuthContext } from "../auth/AuthContext";
import en from "../../languages/en.json";
import no from "../../languages/no.json";
import DefaultContainer from "../../layout/DefaultContainer";

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
    role: number;
}

const Admin: FunctionComponent<Props> = (props) => {
    const { navHeader } = props;
    //const { user, fetchUser } = useContext(AuthContext);

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.user : no.user;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const [user, setUserData] = useState<User | null>(null);

    const loadUserData = async () => {
        const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/16", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            setUserData(data);
        } else {
            console.error("Failed to fetch user data");
        }
    };

    useEffect(() => {
        loadUserData();
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
                    <div className="admin-info-container">
                        <table>
                            <tbody>
                                <tr>
                                    <th>{texts.name}</th>
                                    <td>
                                        {user.person.firstName} {user.person.lastName}
                                    </td>
                                </tr>
                                <tr>
                                    <th>{texts.email}</th>
                                    <td>{user.person.email || "-"}</td>
                                </tr>
                                <tr>
                                    <th>{texts.phone}</th>
                                    <td>{user.person.phone || "-"}</td>
                                </tr>
                                <tr>
                                    <th>{texts.admin}</th>
                                    <td>{user.isAdmin ? "Ja" : "Nei"}</td>
                                </tr>
                                <tr>
                                    <th>{texts.role}</th>
                                    <td>{getRoleName(user.role)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ textAlign: "center" }}>
                            <Link to="/newUser">
                                <Button
                                    style={{
                                        width: "250px",
                                        height: "50px",
                                        border: "1px solid white",
                                        color: "white",
                                        backgroundColor: "#00602C",
                                    }}
                                    sx={{ ":hover": { backgroundColor: "#369E3B" }, margin: 1 }}
                                >
                                    {texts.newUser}{" "}
                                </Button>
                            </Link>
                            <Link to="/userAdministration">
                                <Button
                                    style={{
                                        width: "250px",
                                        height: "50px",
                                        border: "1px solid white",
                                        color: "white",
                                        backgroundColor: "#00602C",
                                    }}
                                    sx={{ ":hover": { backgroundColor: "#369E3B" }, margin: 1 }}
                                >
                                    {texts.users}{" "}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </DefaultContainer>
        </div>
    );
};

export default Admin;
