import { formateDateString, getDueDateStatus, getNameInitials } from "@/shared/utils/utils";
import type { ITask } from "../../types/tasks.types"
import UserAvatar from "@/shared/UserAvatar";
import CalenderIcon from '@/assets/icons/Calendar.svg?react';
import WarningIcon from '@/assets/icons/warning.svg?react';

interface Props {
  task: ITask
}

function TaskBoardCard({ task }: Props) {
  const { isDueToday, isDelayed } = getDueDateStatus(task?.due_date);
  const formattedDueDate = formateDateString(task?.due_date, 'en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`cursor-pointer p-4 border rounded-lg shadow-board flex flex-col gap-4 ${isDueToday && task?.due_date ? 'border-s-2 border-s-primary' : ''} ${isDelayed && task?.due_date ? 'bg-error-container/20 border-error/10' : 'bg-white border-slate-light/10'}`}
    >
      <h2 className="text-slate-dark font-medium leading-4.75">
        {task?.title}
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isDelayed && task?.due_date ? (
            <WarningIcon className="w-3 text-error" />
          ) : (
            <CalenderIcon
              className={`w-3 ${isDueToday ? 'text-primary' : 'text-secondary-light/80'}`}
            />
          )}
          <span
            className={`font-bold text-xs leading-3.75 uppercase ${isDelayed ? 'text-error ' : isDueToday ? 'text-primary' : 'text-secondary-light/80'}`}
          >
            {!task?.due_date
              ? '--'
              : isDueToday
                ? 'Today'
                : isDelayed
                  ? 'Delayed'
                  : formattedDueDate}
          </span>
        </div>
        <UserAvatar
          className={`border border-white size-6! rounded-full! ms-auto ${isDueToday ? 'text-white! bg-primary-container!' : 'bg-surface-md! text-slate-dark!'}`}
         content={getNameInitials(task?.assignee?.name) || '—'}
        />
      </div>
    </div>
  )
}

export default TaskBoardCard