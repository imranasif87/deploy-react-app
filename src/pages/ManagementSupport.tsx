import * as React from "react";
import { FunctionComponent } from "react";
import DefaultContainer from "../layout/DefaultContainer";
import { Link } from "react-router-dom";
import "./css/Controlpanel.css";

interface Props {
  navHeader: string;
}

const ManagementSupport: FunctionComponent<Props> = (props) => {
  const { navHeader } = props;

  return (
    <DefaultContainer navHeader={navHeader}>
      <div className="App">
        <header className="App-header">
          <h1>Lederstøtte </h1>
        </header>
      </div>
      <Link to="/test">Gå tilbake</Link>
    </DefaultContainer>
  );
};

export default ManagementSupport;
