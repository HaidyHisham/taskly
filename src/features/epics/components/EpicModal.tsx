import type { IEpics } from '@/features/epics/types/epics.types';
import Badge from '@/shared/Badge';
import LinkButton from '@/shared/LinkButton';
import PlusIcon from "@/assets/icons/plus.svg?react";
import EmptyTasksIcon from "@/assets/icons/no-tasks.svg?react";
import EpicDetails from "./EpicDetails";
import { useNavigate, useParams } from 'react-router-dom';

interface IProps {
    epic: IEpics;
    onClose?: () => void;
}

function EpicModal({ epic, onClose }: IProps) {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const handleClose = onClose || (() => navigate(`/project/${projectId}/epics`));

    return (
        <section
            className="fixed inset-s-0 inset-e-0 top-0 bottom-0 z-9999999 h-screen bg-slate-dark/20 p-4 lg:p-8 flex items-center justify-center cursor-pointer"
            onClick={handleClose}
        >
            <div
                className="bg-white pb-6 lg:pb-8 rounded-lg sm:w-3/4 lg:w-1/2 sm:mx-auto overflow-y-auto max-h-[80vh] modal-container relative cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                {/* modal content */}
                <EpicDetails epic={epic} onClose={handleClose} />

                {/* tasks section */}
                <div className="flex flex-col gap-4 lg:gap-6 px-6 lg:px-8">
                    {/* header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-body-md text-secondary lg:font-semibold lg:text-slate-dark lg:text-heading-6 lg:leading-7 lg:capitalize">
                            Tasks
                        </h2>
                        {/* mobile badge */}
                        <Badge className="py-0.5 px-2 bg-surface-md rounded-xl lg:hidden">
                            0 tasks
                        </Badge>
                        {/* desktop link */}
                        <LinkButton
                            to=""
                            variant="ghost"
                            btnClassName="hidden lg:flex bg-transparent! text-primary! font-semibold! leading-5!"
                        >
                            <PlusIcon className="[&>path]:fill-primary! w-2.75" />
                            Add Task
                        </LinkButton>
                    </div>
                    {/* tasks list */}
                    <div className="rounded-lg p-12 border-2 border-dashed border-slate-light/30 bg-surface-low flex items-center justify-center">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="bg-surface-highest size-12 rounded-lg flex items-center justify-center">
                                <EmptyTasksIcon className="w-4.5 text-primary lg:text-slate-dark/30" />
                            </div>
                            <p className="text-secondary lg:text-slate-dark max-w-5/6 mx-auto lg:max-w-full lg:font-medium text-center leading-6">
                                No tasks have been added to this epic yet
                            </p>
                            <LinkButton
                                to=""
                                btnClassName="rounded-sm"
                                className="px-4! py-1.5! lg:px-5! lg:py-2!"
                            >
                                <PlusIcon className="text-white w-2.75" />
                                Add Task
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default EpicModal