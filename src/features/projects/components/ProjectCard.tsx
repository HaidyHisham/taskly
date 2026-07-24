import { Link } from "react-router-dom";
import DotsIcon from "@/assets/icons/dots.svg?react";

export interface IProject {
    id: string;
    name: string;
    description: string;
    created_at?: string;
}

interface IProps {
    project: IProject;
}
function ProjectCard({ project }: IProps) {
    const dateString = project.created_at || "";
    const projectFormatedDate = dateString ? new Date(dateString).toLocaleDateString(
        'en-GB',
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }
    ) : "";

    return (
        <Link to={`/project/edit/${project.id}`} className=" w-full h-full rounded-lg p-6 bg-white flex flex-col gap-y-3.5 ">
            <div className="flex justify-between items-start w-full">
                <h2 className="text-title-md text-slate-dark capitalize pr-4">
                    {project?.name}
                </h2>
                <button
                    type="button"
                    className="text-slate-medium hover:text-slate-dark cursor-pointer transition-colors p-1"
                >
                    <DotsIcon className="w-3 h-3" />
                </button>
            </div>
            <p className="mb-6">{project?.description}</p>
            <div className="flex justify-between items-end mt-auto">
                <span className="font-bold text-label text-secondary-light uppercase tracking-[-0.55px]">
                    Created At
                </span>
                <span className="font-medium text-secondary">
                    {projectFormatedDate}
                </span>
            </div>

        </Link>



    )
}

export default ProjectCard