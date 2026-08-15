import { formateDateString, getDueDateStatus, getNameInitials } from "@/shared/utils/utils";
import type { ITask } from "../../tasks/types/tasks.types";

import UnassignedIcon from '@/assets/icons/unassign.svg?react';
import CalenderIcon from '@/assets/icons/Calendar.svg?react';
import AlertIcon from '@/assets/icons/alert.svg?react';
import UserAvatar from "@/shared/UserAvatar";

interface Props {
  task: ITask;
}

const EpicTaskItem = ({ task }: Props) => {
  const { isDelayed, isDueToday } = getDueDateStatus(task?.due_date);
  const assigneeInitials = getNameInitials(task?.assignee?.name);
  const formatedDueDate = formateDateString(task?.due_date);

  function getStatusIcon(isDelayed: boolean, isDueToday: boolean, showDefault = true) {
    if (isDelayed) return <AlertIcon className="w-3 text-error" />;
    if (isDueToday) return <CalenderIcon className="w-3 text-primary" />;
    return showDefault ? <CalenderIcon className="w-2.5 text-secondary/70" /> : null;
  }

  const getDueDateLabel = (
    dueDate?: string | null,
    isDueToday?: boolean,
    isDelayed?: boolean,
    formattedDate?: string
  ): string => {
    if (!dueDate) return '--';
    if (isDueToday) return 'TODAY';
    if (isDelayed) return 'OVERDUE';
   return formattedDate || '--';
  };

  const desktopView = (
    <div className="hidden lg:flex p-4 justify-between items-center gap-4 cursor-pointer">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-semibold text-slate-dark text-body-lg leading-6">
            {task?.title}
          </h3>
          <div className="flex items-center gap-2">
            <UserAvatar
              className="size-6 bg-primary-container/20 text-primary text-label-xs font-bold"
              content={
                task?.assignee?.name ? (
                  assigneeInitials
                ) : (
                  <UnassignedIcon className="w-3.5 text-secondary" />
                )
              }
            />
            <span className="text-slate-dark/70 text-body-sm font-medium leading-4 capitalize">
              {task?.assignee?.name || 'Unassigned'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="uppercase font-bold text-body-xs leading-3.75 text-slate-dark/40">
          Due date
        </span>
        <div className="flex items-center gap-1.5">
          {getStatusIcon(isDelayed, isDueToday, false)}
          <span
            className={`font-semibold text-body-sm leading-4  ${isDelayed
                ? 'text-error'
                : isDueToday
                  ? 'text-primary font-bold'
                  : 'text-slate-dark/70'
              }`}
          >
            {getDueDateLabel(task?.due_date, isDueToday, isDelayed, formatedDueDate)}
          </span>
        </div>
      </div>
    </div>
  );

  const mobileView = (
    <div className="border border-slate-lighter shadow-sm p-4 rounded-lg flex lg:hidden flex-col gap-2 cursor-pointer">
      <div className="flex justify-between items-start">
        <h3 className="text-slate-dark font-semibold text-body leading-5">
          {task?.title}
        </h3>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <UserAvatar
            className="size-6 bg-primary-container/20 text-primary text-label-xs font-bold"
            content={
              task?.assignee?.name ? (
                assigneeInitials
              ) : (
                <UnassignedIcon className="w-3.5 text-secondary" />
              )
            }
          />
          <span className="text-label font-medium leading-4 text-secondary capitalize">
            {task?.assignee?.name || 'Unassigned'}
          </span>
        </div>
        <div className="flex gap-1.5 items-center">
          {getStatusIcon(isDelayed, isDueToday, true)}
          <span
            className={`font-semibold text-label leading-4  ${isDelayed
                ? 'text-error'
                : isDueToday
                  ? 'text-primary font-bold'
                  : 'text-secondary/70'
              }`}
          >
            {getDueDateLabel(task?.due_date, isDueToday, isDelayed, formatedDueDate)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
};

export default EpicTaskItem;
