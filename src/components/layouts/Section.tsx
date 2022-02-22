import Footer from "components/Footer";
import Header from "components/Header";
import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";
import Wrapper from "./Wrapper";

interface Props {
  children: ReactNode;
  sectionId: string;
}

const Section: FunctionComponent<Props> = (props) => {
  const { children, sectionId } = props;

  return <section id={sectionId}>{children}</section>;
};

export default Section;
