import { type IEpics } from '@/features/epics/types/epics.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessToken } from '@/features/auth/utils/auth';
import { getEpics, getEpicById } from '@/features/epics/services/epics.services';

// fetch epics for a project
export const fetchEpics = createAsyncThunk(
  'epics/fetch',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      return await getEpics({ accessToken: token, projectId });
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

interface IInitialState {
  loading: 'pending' | 'success' | 'rejected';
  error: string | null;
  epics: IEpics[];
}

const epicsSlice = createSlice({
  name: 'epics',
  initialState: {
    loading: 'pending',
    error: null,
    epics: [],
  } as IInitialState,
  reducers: {
    resetEpics: (state) => {
      state.loading = 'pending';
      state.epics = [];
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
        state.epics = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || action.payload?.response?.data || [];
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
      });
  },
});

export const { resetEpics } = epicsSlice.actions;

export default epicsSlice.reducer;
