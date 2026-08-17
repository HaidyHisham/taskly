export const TASK_STATUS = {
  TODO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  BLOCKED: 'BLOCKED',
  IN_REVIEW: 'IN_REVIEW',
  READY_FOR_QA: 'READY_FOR_QA',
  REOPENED: 'REOPENED',
  READY_FOR_PRODUCTION: 'READY_FOR_PRODUCTION',
  DONE: 'DONE',
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];


export const TASK_STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'TO_DO', label: 'TO DO' },
  { value: 'IN_PROGRESS', label: 'IN PROGRESS' },
  { value: 'BLOCKED', label: 'BLOCKED' },
  { value: 'IN_REVIEW', label: 'IN REVIEW' },
  { value: 'READY_FOR_QA', label: 'READY FOR QA' },
  { value: 'REOPENED', label: 'REOPENED' },
  { value: 'READY_FOR_PRODUCTION', label: 'READY FOR PRODUCTION' },
  { value: 'DONE', label: 'DONE' },
];

export const formatTaskStatus = (status: TaskStatus | string): string => {
  return status ? status.replace(/_/g, ' ') : '';
};

export interface ITask {
  id: string;
  project_id: string;
  epic_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  due_date: string;
  task_id: string;
  epic: {
    id: string;
    title: string;
    epic_id: string;
  };
  created_by: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
  assignee: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
}
