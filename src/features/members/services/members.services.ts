const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getMembers = async ({
  accessToken,
  projectId,
}: {
  accessToken: string;
  projectId: string;
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/get_project_members?project_id=eq.${projectId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          apikey: `${API_KEY}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to fetch members');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch members'
    );
  }
};
