import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import { Button, ButtonGroup } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/negativ-logo-RGB-no-padding.png";
import "./css/NavBar.css";
import { AuthContext } from "../pages/auth/AuthContext";
import en from "../languages/en.json";
import no from "../languages/no.json";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import englishFlag from "../assets/images/english_flag.png";
import norwegianFlag from "../assets/images/norwegian_flag.png";

interface Props {
    header: string;
    onLanguageChange: (lang: string) => void;
    userEmail: string;
}

const NavBar: FunctionComponent<Props> = (props) => {
    const { onLanguageChange } = props;
    const [language, setLanguage] = useState(() => {
        const storedLang = localStorage.getItem("language");
        return storedLang !== null ? storedLang : "no";
    });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const texts = language === "en" ? en.navbar : no.navbar;

    const navigate = useNavigate();
    const { header, userEmail } = props;
    const { user, fetchUser } = useContext(AuthContext);
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
        navigate("/login");
    };

    const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageSelect = (lang: string) => {
        setLanguage(lang);
        onLanguageChange(lang);
        handleLanguageClose();
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="navbar">
            <Link to="/" className="navbar__img-container navbar--padding">
                <img className="navbar__img-item" src={logo} alt="Widerøe logo" />
            </Link>
            <header className="navbar__header navbar--padding">{header}</header>
            <ButtonGroup
                className="navbar__btns"
                variant="text"
                sx={{ border: "none" }}
            >
                {user ? (
                    <Button
                        href="/user"
                        sx={{
                            color: "white",
                            ":hover": { backgroundColor: "#369E3B" },
                        }}
                    >
                        {user.person.email}
                    </Button>
                ) : null}
                <Button
                    onClick={handleLogoutClick}
                    sx={{
                        color: "white",
                        ":hover": { backgroundColor: "#369E3B" },
                    }}
                >
                    {texts.logout}
                </Button>
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        {texts.language}
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="Language"
                        aria-controls="language-menu"
                        aria-haspopup="true"
                        onClick={handleLanguageClick}
                        color="inherit"
                    >
                        <LanguageIcon />
                    </IconButton>
                    <Menu
                        id="language-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleLanguageClose}
                    >
                        <MenuItem onClick={() => handleLanguageSelect("no")}>
                            <ListItemIcon>
                                <img
                                    src={norwegianFlag}
                                    alt="Norwegian flag"
                                    style={{ width: "1.5em", height: "1em" }}
                                ></img>
                            </ListItemIcon>
                            Norsk
                        </MenuItem>
                        <MenuItem onClick={() => handleLanguageSelect("en")}>
                            <ListItemIcon>
                                <img
                                    src={englishFlag}
                                    alt="English flag"
                                    style={{ width: "1.5em", height: "1em" }}
                                ></img>
                            </ListItemIcon>
                            English
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </ButtonGroup>
        </div>
    );
};

export default NavBar;
