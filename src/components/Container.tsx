import { FunctionComponent, ReactNode } from "react";

interface Props {
  title?: string;
  rightElement?: ReactNode;
  children: ReactNode;
}

const Container: FunctionComponent<Props> = (props) => {
  const { title = "", rightElement = <></>, children } = props;

  return (
    <article className="mb-3 rounded bg-dark-800 p-3 text-white last:mb-0">
      {title && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="title">{title}</h2>
            {rightElement}
          </div>
          <hr className="mt-1 mb-3 h-[1px] border-none bg-dark-700" />
        </>
      )}
      <div>{children}</div>
    </article>
  );
};

export default Container;
