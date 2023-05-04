import * as React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./css/Controlpanel.css";
import DefaultContainer from "../layout/DefaultContainer";

interface Props {
    navHeader: string;
}

const Evaluation: FunctionComponent<Props> = (props) => {
    const { navHeader } = props;

    return (
        <DefaultContainer navHeader={navHeader} onLanguageChange={(lng: any) => {}} >
            <div className="App">
                <header className="App-header">
                    <h1>Evaluering </h1>
                </header>
            </div>
            <Link to="/test">Gå tilbake</Link>
        </DefaultContainer >
    );
};

export default Evaluation;
