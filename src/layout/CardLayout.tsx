import React, { FunctionComponent, ReactNode } from "react";
import DefaultContainer from "./DefaultContainer";
import "./css/CardLayout.css";

interface Props {
  navHeader: string;
  children?: ReactNode;
}

const CardLayout: FunctionComponent<Props> = (props) => {
  const { navHeader, children } = props;

  return (
    <DefaultContainer navHeader={navHeader}>
      <div className="card-layout">
        <div className="card-layout__cards">{children}</div>
      </div>
    </DefaultContainer>
  );
};

export default CardLayout;
