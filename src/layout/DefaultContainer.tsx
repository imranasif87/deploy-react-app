import React, {
    FunctionComponent,
    ReactNode,
    useState,
    useEffect,
} from "react";
import mountain from "../assets/images/fjell.png";
import NavBar from "./NavBar";
import "./css/DefaultContainer.css";

interface Props {
    navHeader: any;
    children?: ReactNode;
    onLanguageChange: (lang: string) => void;
}

const ColumnLayout: FunctionComponent<Props> = (props) => {
    const { navHeader, children, onLanguageChange } = props;
    const [language, setLanguage] = useState(() => {
        const storedLang = localStorage.getItem("language");
        return storedLang !== null ? storedLang : "no";
    });

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
        onLanguageChange(lang);
    };

    useEffect(() => {
        const storedLang = localStorage.getItem("language");
        if (storedLang !== null && storedLang !== language) {
            setLanguage(storedLang);
            onLanguageChange(storedLang);
        }
    }, [language, onLanguageChange]);

    return (
        <div className="column-content">
            <NavBar header={navHeader} onLanguageChange={handleLanguageChange} userEmail='' />
            <div className="column-content__container">{children}</div>
            <img className="column-content__img" src={mountain} alt="Widerøe fjell" />
        </div>
    );
};

export default ColumnLayout;
