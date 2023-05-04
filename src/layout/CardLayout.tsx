import React, { FunctionComponent, ReactNode, useState } from "react";
import DefaultContainer from "./DefaultContainer";
import "./css/CardLayout.css";
import en from "../languages/en.json";
import no from "../languages/no.json";

interface Props {
    navHeader: string;
    children?: ReactNode;
}

const CardLayout: FunctionComponent<Props> = (props) => {
    const { navHeader, children } = props;
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "no"
    );
    const texts = language === "en" ? en.incident : no.incident;

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };
    return (
        <DefaultContainer navHeader={navHeader} onLanguageChange={handleLanguageChange}>
            <div className="card-layout">
                <div className="card-layout__cards">{children}</div>
            </div>
        </DefaultContainer>
    );
};

export default CardLayout;
