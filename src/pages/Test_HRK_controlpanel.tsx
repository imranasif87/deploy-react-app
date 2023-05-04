import { FunctionComponent, ReactNode } from "react";
import CardLayout from "../layout/CardLayout";

interface Props {
  navHeader: string;
  children?: ReactNode;
}

const Test_HRK_controlpanel: FunctionComponent<Props> = (props) => {
  const { navHeader, children } = props;

  return <CardLayout navHeader={navHeader}>{children}</CardLayout>;
};

export default Test_HRK_controlpanel;
