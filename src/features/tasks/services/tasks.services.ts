import type { TTaskInput } from '../schemas/task.schema';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const createTask = async ({
  data,
  accessToken,
}: {
  data: TTaskInput & { project_id: string };
  accessToken: string;
}) => {
  try {
    const formData = {
      ...data,
      epic_id: data.epic_id || null,
      assignee_id: data.assignee_id || null,
      description: data.description || undefined,
      due_date: data.due_date ? new Date(data.due_date).toISOString() : undefined,
    };

    const response = await fetch(`${BASE_URL}/rest/v1/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: `${API_KEY}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.status !== 201 && !response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result?.message || 'Failed to create task');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to create task';
    throw new Error(errMsg);
  }
};
