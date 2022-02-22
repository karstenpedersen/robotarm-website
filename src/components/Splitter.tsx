import { FunctionComponent, ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

const Splitter: FunctionComponent<Props> = (props) => {
  const { children } = props;
  return <div className="grid gap-2 lg:grid-cols-2 lg:gap-4">{children}</div>;
};

export default Splitter;
