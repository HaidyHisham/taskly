const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
import type { TAddProjectInput } from '../schemas/project.schema.';

//create project
export const createProject = async ({
  data,
  accessToken,
}: {
  data: TAddProjectInput;
  accessToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/projects`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        apikey: `${API_KEY}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to create project');
    }

    return true;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to create project'
    );
  }
};