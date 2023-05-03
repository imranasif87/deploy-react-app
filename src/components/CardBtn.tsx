import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./css/CardBtn.css";

interface Props {
  path: string;
  headline: string;
  description?: string;
}

const CardBtn: FunctionComponent<Props> = (props) => {
  const { path, headline, description } = props;

  return (
    <Link to={path} className="screen-container">
      <div className="screen">
        <div className="screen__img" />
        <div className="screen__overlay" />
        <div className="screen__content">
          <h1>{headline}</h1>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardBtn;
