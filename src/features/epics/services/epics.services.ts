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
                Authorization: `Bearer ${accessToken}`
            },
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

export const getEpics = async ({
    projectId,
    accessToken,
}: {
    projectId: string;
    accessToken: string;
}) => {
    try {
        const response = await fetch(
            `${BASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}`,
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
            throw new Error(result?.message || 'Failed to fetch epics');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Failed to fetch epics'
        );
    }
};

export const getEpicById = async ({
    projectId,
    epicId,
    accessToken,
}: {
    projectId: string;
    epicId: string;
    accessToken: string;
}) => {
    try {
        const response = await fetch(
            `${BASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
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
            throw new Error(result?.message || 'Failed to fetch epic details');
        }

        const data = await response.json();
        return data[0] || null;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Failed to fetch epic details'
        );
    }
};

export const updateEpic = async ({
    epicId,
    data,
    accessToken,
}: {
    epicId: string;
    data: Partial<TEpicsInput>;
    accessToken: string;
}) => {
    try {
        const response = await fetch(
            `${BASE_URL}/rest/v1/epics?id=eq.${epicId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: `${API_KEY}`,
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            throw new Error(result?.message || 'Failed to update epic');
        }
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Failed to update epic'
        );
    }
};