import type { IEpics } from '@/features/epics/types/epics.types';
import Badge from '@/shared/Badge';
import LinkButton from '@/shared/LinkButton';
import PlusIcon from "@/assets/icons/plus.svg?react";
import EmptyTasksIcon from "@/assets/icons/no-tasks.svg?react";
import EpicDetails from "./EpicDetails";
import { useNavigate, useParams } from 'react-router-dom';
import EpicTasks from '@/features/epics/components/EpicTasks';
import type { ITask } from '@/features/tasks/types/tasks.types';

const dummyTasks: ITask[] = [
    {
        id: '1',
        task_id: 'TSK-101',
        project_id: 'p1',
        epic_id: 'e1',
        title: 'Initial architectural wireframes',
        description: 'Create initial wireframes for system architecture',
        status: 'TO_DO',
        created_at: '2025-10-01',
        due_date: '2025-10-12',
        epic: { id: 'e1', title: 'Architecture Design', epic_id: 'EPC-1' },
        created_by: { id: 'u1', name: 'Admin', email: 'admin@taskly.com', department: 'Engineering' },
        assignee: { id: 'u2', name: 'John Doe', email: 'john@taskly.com', department: 'Design' },
    },
    {
        id: '2',
        task_id: 'TSK-102',
        project_id: 'p1',
        epic_id: 'e1',
        title: 'Database schema migration plan',
        description: 'Design and review database schema migrations',
        status: 'IN_PROGRESS',
        created_at: '2025-10-05',
        due_date: '2025-10-18',
        epic: { id: 'e1', title: 'Architecture Design', epic_id: 'EPC-1' },
        created_by: { id: 'u1', name: 'Admin', email: 'admin@taskly.com', department: 'Engineering' },
        assignee: { id: 'u3', name: 'Max Smith', email: 'max@taskly.com', department: 'Backend' },
    },
    {
        id: '3',
        task_id: 'TSK-103',
        project_id: 'p1',
        epic_id: 'e1',
        title: 'API Endpoint Documentation',
        description: 'Document all REST API endpoints for frontend team',
        status: 'DONE',
        created_at: '2025-10-10',
        due_date: '2025-10-22',
        epic: { id: 'e1', title: 'Architecture Design', epic_id: 'EPC-1' },
        created_by: { id: 'u1', name: 'Admin', email: 'admin@taskly.com', department: 'Engineering' },
        assignee: { id: 'u4', name: 'Sarah Jenkins', email: 'sarah@taskly.com', department: 'Frontend' },
    },
];

interface IProps {
    epic: IEpics;
    onClose?: () => void;
}

function EpicModal({ epic, onClose }: IProps) {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const tasksList: ITask[] = (epic?.tasks && epic.tasks.length > 0) ? epic.tasks : dummyTasks;

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
                    {tasksList.length > 0 ? (
                        <EpicTasks tasks={tasksList} />
                    ) : (
                        <div className="rounded-lg p-12 border-2 border-dashed border-slate-light/30 bg-surface-low flex items-center justify-center">
                            <div className="flex flex-col justify-center items-center gap-4">
                                <div className="bg-surface-highest size-12 rounded-lg flex items-center justify-center">
                                    <EmptyTasksIcon className="w-4.5 text-primary lg:text-slate-dark/30" />
                                </div>
                                <p className="text-secondary lg:text-slate-dark max-w-5/6 mx-auto lg:max-w-full lg:font-medium text-center leading-6">
                                    No tasks have been added to this epic yet
                                </p>
                                <LinkButton
                                    to={`/project/${projectId}/tasks/new?epicId=${epic.id}`}
                                    btnClassName="rounded-sm"
                                    className="px-4! py-1.5! lg:px-5! lg:py-2!"
                                >
                                    <PlusIcon className="text-white w-2.75" />
                                    Add Task
                                </LinkButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default EpicModal;