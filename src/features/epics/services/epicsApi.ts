import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from '@/features/auth/utils/auth';
import type { IEpics } from '../types/epics.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface GetEpicsResponse {
    project_epics: IEpics[];
    totalCount: number;
}

interface GetEpicsArgs {
    projectId: string;
    page?: number;
    limit?: number;
}

export const epicsApi = createApi({
    reducerPath: 'epicsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getAccessToken();
            headers.set('Content-Type', 'application/json');
            headers.set('apikey', API_KEY);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Prefer', 'count=exact');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getEpics: builder.query<GetEpicsResponse, GetEpicsArgs>({
            query: ({ projectId, page = 1, limit = 6 }) => {
                const offset = (page - 1) * limit;

                return {
                    url: '/rest/v1/project_epics',
                    params: {
                        project_id: `eq.${projectId}`,
                        limit,
                        offset,
                    },
                };
            },
            transformResponse: (response: IEpics[], meta) => {
                const contentRange = meta?.response?.headers.get('content-range');
                const totalCount = contentRange
                    ? parseInt(contentRange.split('/')[1], 10)
                    : response?.length || 0;

                return {
                    project_epics: response || [],
                    totalCount,
                };
            },
          
        }),
    }),
});

export const { useGetEpicsQuery } = epicsApi;