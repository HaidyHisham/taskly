import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessToken } from '@/features/auth/utils/auth';
import { getEpicTasks } from '@/features/tasks/services/tasks.services';
import type { ITask } from '@/features/tasks/types/tasks.types';

export const fetchEpicTasks = createAsyncThunk(
  'tasks/fetchEpicTasks',
  async (epicId: string, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      return await getEpicTasks(epicId, token);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch tasks'
      );
    }
  }
);

interface ITasksState {
  loading: 'idle' | 'pending' | 'success' | 'rejected';
  error: string | null;
  tasks: ITask[];
}

const initialState: ITasksState = {
  loading: 'idle',
  error: null,
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: (state) => {
      state.loading = 'idle';
      state.tasks = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpicTasks.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchEpicTasks.fulfilled, (state, action) => {
        state.loading = 'success';
        state.tasks = action.payload || [];
      })
      .addCase(fetchEpicTasks.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = (action.payload as string) || 'Failed to load tasks';
      });
  },
});

export const { resetTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
