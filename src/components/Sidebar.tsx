import { Component, FunctionComponent, ReactNode, useState } from "react";
import Wrapper from "./layouts/Wrapper";
import Navigation from "./Navigation";
import Link from "next/link";
import { useMqttState } from "mqtt-react-hooks";
import * as FaIcons from "react-icons/fa";

interface Props {}
// fixed  left-0
const Sidebar: FunctionComponent<Props> = () => {
  return (
    <section className="top-[6vh] z-20 h-full w-full bg-dark-800 shadow-md transition-width">
      <Navigation
        className="flex h-full flex-col justify-between"
        listClassName="flex flex-col gap-2 p-2"
        lowerClassName="rounded-none px-4"
        sidebar={true}
      />
    </section>
  );
};

interface ItemProps {
  title: string;
  path: string;
  icon: ReactNode;
}

const NavItem: FunctionComponent<ItemProps> = (props) => {
  const { title, path, icon } = props;

  return (
    <li>
      <Link href={path}>
        <a>
          {icon}
          {title}
        </a>
      </Link>
    </li>
  );
};

export default Sidebar;
