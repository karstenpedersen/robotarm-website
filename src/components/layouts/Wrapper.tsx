import { FunctionComponent } from "react";

const Wrapper: FunctionComponent = ({ children }) => {
  return (
    <div className="h-full w-full bg-inherit">
      <div className="mx-auto h-full w-[90vw] max-w-[960px]">{children}</div>
    </div>
  );
};

export default Wrapper;
