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
  // mt-[6vh] sm:ml-14 md:ml-56
  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="grid h-screen grid-cols-1 grid-rows-page sm:grid-cols-page-sm md:grid-cols-page">
        <div className="col-span-2">
          <Header />
        </div>
        <div className="hidden h-full w-full sm:block">
          <Sidebar />
        </div>
        <div className="overflow-y-auto overflow-x-hidden bg-gray-100 p-2"></div>
      </div>
    </div>
  );
};

export default Page;
