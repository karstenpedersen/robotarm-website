import { FunctionComponent, ReactNode } from "react";

interface TagProps {
  title: string;
  link: string;
  icon: ReactNode;
}

const IconLink: FunctionComponent<TagProps> = (props) => {
  const { title, link, icon } = props;

  return (
    <a href={link} className="flex items-center gap-2">
      {icon}
      {title}
    </a>
  );
};

export default IconLink;
