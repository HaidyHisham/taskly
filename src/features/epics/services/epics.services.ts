 import type { TEpicsInput } from '../schemas/epics.schema';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
 
export const createEpic = async ({
  data,
  accessToken,
  projectId,
}: {
  data: TEpicsInput;
  accessToken: string;
  projectId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/epics`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        apikey: `${API_KEY}`,
        Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ ...data, project_id: projectId }),
    });

    if (response.status !== 201) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to create epic');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to create epic';
    throw new Error(errMsg);
  }
};