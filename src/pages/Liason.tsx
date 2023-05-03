import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

const Liason: FunctionComponent<Props> = (props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );
  const texts = language === "en" ? en.liason : no.liason;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <DefaultContainer
      navHeader="Liason"
      onLanguageChange={handleLanguageChange}
    >
      <div className="App">
        <header className="App-header">
          <h1>Liason </h1>
        </header>
      </div>
      <Link to="/test">{texts.back}</Link>
    </DefaultContainer>
  );
};

export default Liason;
