import { FunctionComponent, useState } from "react";
import Wrapper from "./layouts/Wrapper";
import Navigation from "./Navigation";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import { useMqttState } from "mqtt-react-hooks";

const Header = () => {
  const [showMobile, setShowMobile] = useState(false);

  function handleMobile() {
    setShowMobile(!showMobile);
  }
  //fixed top-0 left-0
  return (
    <div>
      <header className="z-30 flex h-[6vh] min-h-[6vh] w-full items-center justify-between bg-dark-900 px-3 text-primary shadow-lg xl:shadow-none">
        <div className="flex h-full items-center justify-between text-xl font-bold uppercase">
          <Link href="/">
            <a className="flex items-center gap-2">
              <FaIcons.FaRobot className="text-4xl" />
              <p className="header-title">Robot Arm</p>
            </a>
          </Link>
        </div>

        <FaIcons.FaGripLines
          className="rounded px-1 text-4xl text-primary hover:bg-primary hover:text-white sm:hidden"
          role="button"
          onClick={() => {
            handleMobile();
          }}
        />
      </header>

      {showMobile && (
        <>
          <div
            className="fixed top-0 left-0 z-40 h-full w-full bg-black opacity-80"
            role="button"
            onClick={() => {
              handleMobile();
            }}
          ></div>
          <div className="opacity-200 fixed top-0 right-0 z-50 h-full w-4/5 bg-dark-800 shadow-lg">
            <div className="flex h-[6vh] items-center justify-between">
              <p></p>
              <FaIcons.FaGripLinesVertical
                className="float-right mr-3 rounded px-1 py-1 text-4xl text-primary hover:bg-primary hover:text-white"
                role="button"
                onClick={() => {
                  handleMobile();
                }}
              />
            </div>

            <Navigation
              className="h-[50%] p-5"
              listClassName="flex flex-col text-center justify-none "
              topClassName="mb-8"
              closeMenu={() => {
                setShowMobile(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
