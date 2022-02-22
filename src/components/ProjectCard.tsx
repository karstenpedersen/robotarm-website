import { FunctionComponent, ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  iconLinks?: ReactNode;
  className?: string;
}

const ProjectCard: FunctionComponent<Props> = (props) => {
  const {
    title = "Title",
    description = "Description",
    iconLinks,
    className = "",
  } = props;

  return (
    <article
      className={
        className +
        "shadow-left rounded-md bg-white transition duration-100 hover:scale-105"
      }
    >
      <div className="flex h-full flex-col justify-between p-3">
        <div className="mb-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p>{description}</p>
        </div>
        <div className="flex flex-wrap gap-4 gap-y-0">{iconLinks}</div>
      </div>
    </article>
  );
};

export default ProjectCard;
