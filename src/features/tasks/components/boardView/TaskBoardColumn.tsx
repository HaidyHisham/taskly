import { useParams } from "react-router-dom";
import { TASK_STATUS, type TaskStatus, type ITask } from "../../types/tasks.types";
import LinkButton from "@/shared/LinkButton";
import PlusIcon from "@/assets/icons/plus.svg?react";
import PlusBorderIcon from "@/assets/icons/plusborder.svg?react";


interface Props {
    status: TaskStatus;
    tasks?: ITask[];
}

    const statusColor: {
        [key: string]: {
            dotBackgroundColor: string;
            lengthClassName?: string;
        };
    } = {
        [TASK_STATUS.TODO]: {
            dotBackgroundColor: 'bg-accent',
            lengthClassName: 'bg-surface-md text-secondary',
        },
        [TASK_STATUS.IN_PROGRESS]: {
            dotBackgroundColor: 'bg-primary-container',
            lengthClassName: 'bg-primary-container/10 text-primary',
        },
        [TASK_STATUS.BLOCKED]: {
            dotBackgroundColor: 'bg-error',
            lengthClassName: 'bg-error/10 text-error',
        },
        [TASK_STATUS.IN_REVIEW]: {
            dotBackgroundColor: 'bg-slate-dark',
            lengthClassName: 'bg-surface-md text-secondary',
        },
        [TASK_STATUS.READY_FOR_QA]: {
            dotBackgroundColor: 'bg-slate-md',
            lengthClassName: 'bg-surface-md text-secondary',
        },
        [TASK_STATUS.REOPENED]: {
            dotBackgroundColor: 'bg-surface-dark',
            lengthClassName: 'bg-surface-md text-secondary',
        },
        [TASK_STATUS.READY_FOR_PRODUCTION]: {
            dotBackgroundColor: 'bg-warning',
            lengthClassName: 'bg-warning/10 text-warning',
        },
        [TASK_STATUS.DONE]: {
            dotBackgroundColor: 'bg-success-text',
            lengthClassName: 'bg-success/10 text-success-text',
        },
    };

    const formateTaskStatus = (status: string) => {
        if (!status) return '-';
        return status.replace(/_/g, ' ');
    };

function TaskBoardColumn({ status, tasks = [] }: Props) {
    const { projectId } = useParams();
    const columnTasks = tasks.filter((t) => t.status === status);
    const taskCount = columnTasks.length;


    const displayedStatusTitle = formateTaskStatus(status);
    const to = status
        ? `/project/${projectId}/tasks/new?status=${status}`
        : `/project/${projectId}/tasks/new`;

    return (
      <div className="flex flex-col gap-4 min-w-64 max-h-full overflow-y-auto">
            {/* status header */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${statusColor[status]?.dotBackgroundColor}`}></div>
                    <span className="text-label-sm text-accent-dark font-medium capitalize">
                        {displayedStatusTitle}
                    </span>
                    <div
                        className={`text-body-xs font-bold leading-4.5 size-4.75 rounded-xs flex items-center justify-center py-0.5 px-1.5 ${statusColor[status]?.lengthClassName}`}
                    >
                        <span>{taskCount}</span>
                    </div>
                </div>
                <LinkButton to={to} variant="ghost" className="w-fit p-0.5">
                    <PlusIcon className="w-2.75 text-secondary" />
                </LinkButton>
            </div>
            {/* add task link */}
        <LinkButton
          to={to}
          variant="ghost"
          className="border-2 border-slate-light/40 border-dashed p-4! w-full! gap-2! rounded-sm"
        >
          <PlusBorderIcon className="text-secondary/60 size-3.5" />
          <span className="uppercase text-secondary/60 font-bold text-label letter-spacing-xl leading-4">
            Add New Task
          </span>
        </LinkButton>
        </div>
    );
}

export default TaskBoardColumn;