import type { ITask } from '@/features/tasks/types/tasks.types';

export interface IEpics {
  id: string;
  project_id: string;
  title: string;
  description: string;
  created_at: string;
  deadline: string;
  epic_id: string;
  created_by: {
    sub: string;
    name: string;
    email: string;
    department: string | null;
  };
  assignee: {
    sub: string;
    name: string;
    email: string;
    department: string | null;
  };
  tasks?: ITask[];
}
