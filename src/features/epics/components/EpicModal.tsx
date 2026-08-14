import type { IEpics } from '@/features/epics/types/epics.types';
import Badge from '@/shared/Badge';
import LinkButton from '@/shared/LinkButton';
import PlusIcon from "@/assets/icons/plus.svg?react";
import EpicDetails from "./EpicDetails";
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EpicTasks from '@/features/epics/components/EpicTasks';
import { useAppDispatch, useAppSelector } from '@/shared/store/store';
import { fetchEpicTasks } from '@/shared/store/slices/tasks.slice';
import LoadingEpicTasks from './LoadingEpicTasks';
import EmptyEpicTasks from './EmptyEpicTasks';

interface IProps {
    epic: IEpics;
    onClose?: () => void;
}

function EpicModal({ epic, onClose }: IProps) {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const dispatch = useAppDispatch();

    const { tasks, loading, error } = useAppSelector((state) => state.tasks);

    useEffect(() => {
        if (epic?.id) {
            dispatch(fetchEpicTasks(epic.id));
        }
    }, [dispatch, epic?.id]);

    const handleClose = onClose || (() => navigate(`/project/${projectId}/epics`));

    const tasksList = tasks.length > 0 ? tasks : (epic?.tasks || []);

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
                    {loading === 'pending' ? (
                        <LoadingEpicTasks />
                    ) : loading === 'rejected' ? (
                        <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-center">
                            <p className="text-error font-medium text-body-sm">{error || 'Failed to load tasks'}</p>
                        </div>
                    ) : tasksList.length === 0 ? (
                        <EmptyEpicTasks />
                    ) : (
                        <>
                            {/* header */}
                            <div className="flex justify-between items-center">
                                <h2 className="text-body-md text-secondary lg:font-semibold lg:text-slate-dark lg:text-heading-6 lg:leading-7 lg:capitalize">
                                    Tasks
                                </h2>
                                {/* mobile badge */}
                                <Badge className="py-0.5 px-2 bg-surface-md rounded-xl lg:hidden">
                                    {tasksList.length} tasks
                                </Badge>
                                {/* desktop link */}
                                <LinkButton
                                    to={`/project/${projectId}/tasks/new?epicId=${epic.id}`}
                                    variant="ghost"
                                    btnClassName="hidden lg:flex bg-transparent! text-primary! font-semibold! leading-5!"
                                >
                                    <PlusIcon className="[&>path]:fill-primary! w-2.75" />
                                    Add Task
                                </LinkButton>
                            </div>
                            {/* tasks list */}
                            <EpicTasks tasks={tasksList} />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default EpicModal;