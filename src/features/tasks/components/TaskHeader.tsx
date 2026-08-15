import LinkButton from "@/shared/LinkButton";
import Search from "@/shared/Search";
import { useParams } from "react-router-dom";
import PlusIcon from "@/assets/icons/plus.svg?react"
import TaskViewSelect from "./TaskViewSelect";

const TaskHeader = () => {
    const { projectId } = useParams();
const desktopView = (
    <header className="hidden lg:flex lg:flex-col xl:flex-row xl:justify-between xl:items-end gap-4">
      <div className="hidden lg:flex flex-col gap-1.5">
        <h1 className="font-semibold text-slate-dark text-3xl leading-9 tracking-tight ">
          Active Workboard
        </h1>
        <p className="text-body leading-5 text-accent">
          Curating Project Alpha's production pipeline and milestones.
        </p>
      </div>
      <div className="flex items-center gap-3 lg:ms-auto">
        <Search
          placeholder="Search tasks..."
        />
        <TaskViewSelect />
      </div>
    </header>
  );

  
const mobileView = (
    <header className="flex flex-col lg:hidden gap-6">
      <h1 className="font-semibold text-slate-dark text-3xl leading-9 tracking-tight">
        Active Workboard
      </h1>
      <div className="flex flex-col gap-3">
        <Search
          placeholder="Search tasks..."
        
        />
        <LinkButton
          to={`/project/${projectId}/tasks/new`}
          className="py-2! w-full font-semibold leading-5"
        >
          <PlusIcon className="text-white w-2" />
          Create Task
        </LinkButton>
       
      </div>
    </header>

  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
};
export default TaskHeader;

