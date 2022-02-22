import Footer from "components/Footer";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
}

const Page: FunctionComponent<Props> = (props) => {
  const { children, title = "TITLE" } = props;

  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="grid h-screen grid-cols-1 grid-rows-page sm:grid-cols-page-sm md:grid-cols-page">
        <div className="z-30 col-span-2 shadow-md">
          <Header />
        </div>
        <div className="z-40 hidden h-full w-full shadow-md sm:block">
          <Sidebar />
        </div>
        <div className="overflow-y-auto overflow-x-hidden bg-dark-700 p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
