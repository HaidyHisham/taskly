import { formateDateString, getNameInitials } from "@/shared/utils/utils";
import type { ITask } from "../../tasks/types/tasks.types";

import UnassignedIcon from '@/assets/icons/unassign.svg?react';
import CalenderIcon from '@/assets/icons/calendar.svg?react';
import { getDueDateStatus } from "@/shared/utils/utils";
import AlertIcon from '@/assets/icons/Alert.svg?react';
import UserAvatar from "@/shared/UserAvatar";

interface Props {
  task: ITask;
}

const EpicTaskItem: React.FC<Props> = ({ task }) => {
  const { isDelayed, isDueToday } = getDueDateStatus(task?.due_date);
  const assigneeInitials = getNameInitials(task?.assignee?.name);
  const formatedDueDate = formateDateString(task?.due_date);

  function getStatusIcon(isDelayed: boolean, isDueToday: boolean) {
    if (isDelayed) return <AlertIcon className="w-3 text-error" />;
    if (isDueToday) return <CalenderIcon className="w-2.5 text-primary" />;
    return <CalenderIcon className="w-2.5 text-secondary/70" />;
  }


  const getDueDateLabel = (
    dueDate?: string | null,
    isDueToday?: boolean,
    isDelayed?: boolean,
    formattedDate?: string
  ): string => {
    if (!dueDate) return '--';
    if (isDueToday) return 'Today';
    if (isDelayed) return `Overdue`;
    return formattedDate || '--';
  };




  const desktopView = (
    <div
      className="hidden lg:flex p-4 justify-between items-center gap-4 cursor-pointer"

    >
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-1">
          <h3 className=" font-medium text-slate-dark text-body-lg leading-6">
            {task?.title}
          </h3>
          <div className="flex items-center gap-1">
            <UserAvatar
              className="size-6! bg-surface-dark text-label-xs text-secondary-light!"
              content={
                task?.assignee?.name ? (
                  assigneeInitials
                ) : (
                  <UnassignedIcon className="w-3" />
                )
              }
            />
            <span className="text-slate-dark/60 text-body-sm leading-4">
              {task?.assignee?.name || 'Unassigned'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-px">
        <span className="uppercase font-bold text-body-xs leading-3.75 text-slate-dark/40">
          Due date
        </span>
        <span className={`text-body-xs ${isDelayed ? 'text-error' : 'text-secondary'} uppercase`}>
          {getDueDateLabel(task?.due_date, isDueToday, isDelayed, formatedDueDate)}
        </span>
      </div>
    </div>
  );

  const mobileView = (
    <div
      className="border border-slate-lighter shadow-sm p-4 rounded-lg flex lg:hidden flex-col gap-2 cursor-pointer"

    >
      <div className="flex justify-between items-start ">
        <h3 className="text-slate-dark font-semibold text-body leading-5">
          {task?.title}
        </h3>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <UserAvatar
            className="size-6 bg-primary-container rounded-xl text-label-xs text-white"
            content={
              task?.assignee?.name ? (
                assigneeInitials
              ) : (
                <UnassignedIcon className="w-3" />
              )
            }
          />
          <span className="text-label font-medium leading-4 text-secondary capitalize">
            {task?.assignee?.name || 'Unassigned'}
          </span>
        </div>
        <div className="flex gap-1.5">
          {getStatusIcon(isDelayed, isDueToday)}
          <span className={`text-body-xs ${isDelayed ? 'text-error' : 'text-secondary'} uppercase`}>
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
