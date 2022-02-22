import Link from "next/link";
import { FunctionComponent, ReactNode, useState } from "react";
import * as FaIcons from "react-icons/fa";

interface Props {
  className?: string;
  listClassName?: string;
  topClassName?: string;
  lowerClassName?: string;
  closeMenu?: () => void;
  sidebar?: boolean;
}

const Navigation: FunctionComponent<Props> = (props) => {
  const {
    className = "",
    listClassName = "",
    topClassName = "",
    lowerClassName = "",
    closeMenu = () => {},
    sidebar = false,
  } = props;

  return (
    <nav className={className}>
      <ul className={listClassName}>
        <NavItem
          title="Home"
          path="/"
          icon={<FaIcons.FaHome />}
          closeMenu={closeMenu}
          sidebar={sidebar}
          className={topClassName}
        />
        <NavItem
          title="Server"
          path="/server"
          icon={<FaIcons.FaSatellite />}
          closeMenu={closeMenu}
          sidebar={sidebar}
          className={topClassName}
        />
      </ul>

      <NavItem
        title="Settings"
        path="/settings"
        icon={<FaIcons.FaCog />}
        closeMenu={closeMenu}
        sidebar={sidebar}
        className={lowerClassName}
      />
    </nav>
  );
};

interface ItemProps {
  title: string;
  path: string;
  icon: ReactNode;
  className?: string;
  closeMenu?: () => void;
  sidebar?: boolean;
}

const NavItem: FunctionComponent<ItemProps> = (props) => {
  const {
    title,
    path,
    icon,
    className,
    closeMenu = () => {},
    sidebar = false,
  } = props;

  return (
    <li className="group relative list-none">
      <Link href={path}>
        <a
          onClick={() => {
            closeMenu();
          }}
          className={
            "flex items-center gap-2 rounded bg-dark-700 p-2 text-lg text-white shadow-lg hover:bg-primary hover:text-white " +
            className
          }
        >
          <p className="text-2xl">{icon}</p>
          <p className={sidebar ? "text-xm hidden md:block" : ""}>{title}</p>
        </a>
      </Link>

      <span
        className={
          "bg-dark-900 absolute left-14 top-1 w-auto min-w-max origin-left scale-0 rounded-md p-2 text-xs font-bold text-white shadow-md transition-all duration-100 group-hover:sm:scale-100 group-hover:md:scale-0"
        }
      >
        {title}
      </span>
    </li>
  );
};

export default Navigation;
