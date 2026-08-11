import { type IEpics } from '@/features/epics/types/epics.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessToken } from '@/features/auth/utils/auth';
import { getEpics, getEpicById, updateEpic } from '@/features/epics/services/epics.services';
import type { TEpicsInput } from '@/features/epics/schemas/epics.schema';

interface FetchEpicsArgs {
  projectId: string;
  page?: number;
  limit?: number;
}

// fetch epics for a project with optional pagination
export const fetchEpics = createAsyncThunk(
  'epics/fetch',
  async (args: FetchEpicsArgs | string, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      const params = typeof args === 'string' ? { projectId: args } : args;
      return await getEpics({ accessToken: token, ...params });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

// fetch single epic details by id
export const fetchEpicById = createAsyncThunk(
  'epics/fetchById',
  async (
    { projectId, epicId }: { projectId: string; epicId: string },
    { rejectWithValue }
  ) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      return await getEpicById({ accessToken: token, projectId, epicId });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

// update epic by id
export const updateEpicThunk = createAsyncThunk(
  'epics/update',
  async (
    { epicId, data }: { epicId: string; data: Partial<TEpicsInput> },
    { rejectWithValue }
  ) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      await updateEpic({ epicId, data, accessToken: token });
      return { epicId, data };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update epic'
      );
    }
  }
);

interface IInitialState {
  loading: 'pending' | 'success' | 'rejected';
  error: string | null;
  epics: IEpics[];
  totalCount: number;
}

const epicsSlice = createSlice({
  name: 'epics',
  initialState: {
    loading: 'pending',
    error: null,
    epics: [],
    totalCount: 0,
  } as IInitialState,
  reducers: {
    resetEpics: (state) => {
      state.loading = 'pending';
      state.epics = [];
      state.totalCount = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpics.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchEpics.fulfilled, (state, action) => {
        state.loading = 'success';
        if (action.payload && typeof action.payload === 'object' && 'data' in action.payload) {
          state.epics = action.payload.data;
          state.totalCount = action.payload.totalCount;
        } else {
          state.epics = Array.isArray(action.payload) ? action.payload : [];
          state.totalCount = state.epics.length;
        }
      })
      .addCase(fetchEpics.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = (action.payload as string) || 'Failed to fetch epics';
      })
      .addCase(fetchEpicById.fulfilled, (state, action) => {
        if (action.payload) {
          const exists = state.epics.some((e) => e.id === action.payload.id);
          if (!exists) {
            state.epics.push(action.payload);
          } else {
            state.epics = state.epics.map((e) =>
              e.id === action.payload.id ? action.payload : e
            );
          }
        }
      })
      .addCase(updateEpicThunk.fulfilled, (state, action) => {
        const { epicId, data } = action.payload;
        state.epics = state.epics.map((e) => {
          if (e.id === epicId) {
            return {
              ...e,
              ...data,
            };
          }
          return e;
        });
      });
  },
});

export const { resetEpics } = epicsSlice.actions;

export default epicsSlice.reducer;
