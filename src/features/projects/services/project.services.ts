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
/*projects list */
export const getProjects = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/rpc/get_projects`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        apikey: `${API_KEY}`,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to get projects');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get projects'
    );
  }
};

/* paginated projects list service */
export const getPaginatedProjects = async ({
  accessToken,
  limit,
  offset,
}: {
  accessToken: string;
  limit: number;
  offset: number;
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          apikey: `${API_KEY}`,
          Authorization: `Bearer ${accessToken}`,
          Prefer: 'count=exact',
         
        },
      }
    );

    if (
      response.status === 204 ||
      response.headers.get('content-length') === '0'
    ) {
      return {
        response: {
          data: [],
          meta: { totalCount: 0, totalPages: 0 },
        },
      };
    }

    const data = await response?.json();
    if (!response.ok) throw new Error(data?.msg || data?.message || 'Failed to fetch data');

    const meta = { totalCount: 0, totalPages: 0 };
    const contentRange = response.headers.get('content-range');

    if (contentRange) {
      const totalCount = Number(contentRange?.split('/')[1] || 0);
      meta.totalCount = totalCount;
      meta.totalPages = Math.ceil(totalCount / limit);
    } else {
      meta.totalCount = Array.isArray(data) ? data.length : 0;
      meta.totalPages = Math.ceil(meta.totalCount / limit);
    }

    return {
      response: {
        data: Array.isArray(data) ? data : [],
        meta,
      },
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch data'
    );
  }
};

/*update project */
export const updateProject = async ({
  data,
  accessToken,
  projectId,
}: {
  data: TAddProjectInput;
  accessToken: string;
  projectId: string;
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          apikey: `${API_KEY}`,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status !== 204) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to update project');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to update project';
    throw new Error(errMsg);
  }
};

/* get single project by id */
export const getProjectById = async ({
  projectId,
  accessToken,
}: {
  projectId: string;
  accessToken: string;
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          apikey: `${API_KEY}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to get project');
    }

    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get project'
    );
  }
};