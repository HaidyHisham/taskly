import { Link } from "react-router-dom";
import EditIcon from "@/assets/icons/edit.svg?react";

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
        <div className="flex flex-col gap-y-3.5 rounded-lg p-6 bg-white h-full relative">
            <div className="flex justify-between items-start w-full">
                <Link to={`/project/${project.id}/epics`} className="text-title-md text-slate-dark capitalize pr-4">
                    {project?.name}
                </Link>
                <Link
                    to={`/project/${project?.id}/edit`}
                    state={{ project }}
                    className="text-primary hover:text-primary-dark transition-colors p-1 shrink-0"
                >
                    <EditIcon className="w-5 h-5 text-primary" />
                </Link>
            </div>
            <Link to={`/project/${project.id}/epics`} className="flex flex-col gap-y-3.5 h-full justify-between">
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
        </div>
    )
}

export default ProjectCard