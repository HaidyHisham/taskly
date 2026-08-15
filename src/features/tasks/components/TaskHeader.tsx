import LinkButton from "@/shared/LinkButton";
import Search from "@/shared/Search";
import { useParams } from "react-router-dom";
import PlusIcon from "@/assets/icons/plus.svg?react"
import TaskViewSelect from "./TaskViewSelect";

const TaskHeader = () => {
  const { projectId } = useParams();

  return (
    <header className="flex flex-col gap-6 lg:gap-4 lg:flex-row lg:justify-between lg:items-end">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-semibold text-slate-dark text-3xl leading-9 tracking-tight">
          Active Workboard
        </h1>
        <p className="hidden lg:block text-body leading-5 text-accent">
          Curating Project Alpha's production pipeline and milestones.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <Search placeholder="Search tasks..." />
        <TaskViewSelect className="hidden lg:flex" />
        <LinkButton
          to={`/project/${projectId}/tasks/new`}
          className="lg:hidden py-2! w-full font-semibold leading-5"
        >
          <PlusIcon className="text-white w-2" />
          Create Task
        </LinkButton>
      </div>
    </header>
  );
};
export default TaskHeader;

