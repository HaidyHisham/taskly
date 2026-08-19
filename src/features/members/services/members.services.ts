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

export const inviteMember = async ({
  projectId,
  email,
  accessToken,
}: {
  projectId: string;
  email: string;
  accessToken: string;
}) => {
  const payload = {
    p_email: email,
    p_project_id: projectId,
    p_app_url: import.meta.env.VITE_APP_URL || "http://localhost:5173/",
    p_base_url: BASE_URL,
  }
  try {
    // console.log(payload);
    
    const response = await fetch(`${BASE_URL}/rest/v1/rpc/invite_member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: `${API_KEY}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result?.message || result?.msg || 'Failed to invite member');
    }

    return await response.json().catch(() => ({}));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to invite member'
    );
  }
};
