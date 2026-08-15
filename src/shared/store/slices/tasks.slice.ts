import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessToken } from '@/features/auth/utils/auth';
import { getEpicTasks, getTasksByStatus } from '@/features/tasks/services/tasks.services';
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

export const fetchTasksByStatus = createAsyncThunk(
  'tasks/fetchTasksByStatus',
  async (
    { projectId, status }: { projectId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      const data = await getTasksByStatus({ projectId, status, accessToken: token });
      return { status, tasks: data };
    } catch (error) {
      return rejectWithValue({
        status,
        message: error instanceof Error ? error.message : 'Failed to load tasks',
      });
    }
  }
);

export interface IColumnState {
  loading: 'idle' | 'pending' | 'success' | 'rejected';
  error: string | null;
  tasks: ITask[];
}

interface ITasksState {
  loading: 'idle' | 'pending' | 'success' | 'rejected';
  error: string | null;
  tasks: ITask[];
  tasksByStatus: Record<string, IColumnState>;
}

const initialState: ITasksState = {
  loading: 'idle',
  error: null,
  tasks: [],
  tasksByStatus: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: (state) => {
      state.loading = 'idle';
      state.tasks = [];
      state.error = null;
      state.tasksByStatus = {};
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
      })
      .addCase(fetchTasksByStatus.pending, (state, action) => {
        const { status } = action.meta.arg;
        state.tasksByStatus[status] = {
          loading: 'pending',
          error: null,
          tasks: state.tasksByStatus[status]?.tasks || [],
        };
      })
      .addCase(fetchTasksByStatus.fulfilled, (state, action) => {
        const { status, tasks } = action.payload;
        state.tasksByStatus[status] = {
          loading: 'success',
          error: null,
          tasks,
        };
      })
      .addCase(fetchTasksByStatus.rejected, (state, action) => {
        const { status } = action.meta.arg;
        const payload = action.payload as { status: string; message: string } | undefined;
        state.tasksByStatus[status] = {
          loading: 'rejected',
          error: payload?.message || 'Failed to load tasks',
          tasks: state.tasksByStatus[status]?.tasks || [],
        };
      });
  },
});

export const { resetTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
