import { FunctionComponent, ReactNode } from "react";
import CardLayout from "../layout/CardLayout";

interface Props {
  navHeader: string;
  children?: ReactNode;
}

const Home: FunctionComponent<Props> = (props) => {
  const { navHeader, children } = props;

  return <CardLayout navHeader={navHeader}>{children}</CardLayout>;
};

export default Home;
