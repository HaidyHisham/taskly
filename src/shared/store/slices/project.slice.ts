import type { IProject } from "@/features/projects/components/ProjectCard";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAccessToken } from "@/features/auth/utils/auth";
import { getPaginatedProjects, getProjectById } from "@/features/projects/services/project.services";

export const fetchPaginatedProjects = createAsyncThunk(
  'projects/fetchPaginated',
  async (
    { limit, offset }: { limit: number; offset: number; append?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      return await getPaginatedProjects({ accessToken: token, limit, offset });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch projects'
      );
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchById',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      return await getProjectById({ projectId, accessToken: token });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch project'
      );
    }
  }
);

interface IInitialState {
  currentPage: number;
  totalCount: number | undefined;
  limit: number;
  loading: 'pending' | 'success' | 'rejected';
  error: string | null;
  projects: IProject[];
  totalPages: number | undefined;
  currentProject: IProject | null;
  currentProjectLoading: 'idle' | 'pending' | 'success' | 'rejected';
}

const LIMIT = 12;

const initialState: IInitialState = {
  currentPage: 1,
  totalCount: 0,
  limit: LIMIT,
  totalPages: undefined,
  loading: 'pending',
  error: null,
  projects: [],
  currentProject: null,
  currentProjectLoading: 'idle',
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<IProject | null>) => {
      state.currentProject = action.payload;
    },
    resetProjects: (state) => {
      state.currentPage = 1;
      state.totalCount = 0;
      state.totalPages = undefined;
      state.loading = 'pending';
      state.projects = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedProjects.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchPaginatedProjects.fulfilled, (state, action) => {
        state.loading = 'success';
        state.totalCount = action.payload?.response?.meta?.totalCount;
        state.totalPages = action.payload?.response?.meta?.totalPages;
        const newProjects = action.payload?.response?.data || [];

        if (action.meta.arg.append) {
          const existingIds = new Set(
            state.projects.map((p: IProject) => p.id)
          );
          const filteredNew = newProjects.filter(
            (p: IProject) => !existingIds.has(p.id)
          );
          state.projects = [...state.projects, ...filteredNew];
        } else {
          state.projects = newProjects;
        }
      })
      .addCase(fetchPaginatedProjects.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Failed to fetch projects';
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.currentProjectLoading = 'pending';
      })
      .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<IProject | null>) => {
        state.currentProjectLoading = 'success';
        state.currentProject = action.payload;
        if (action.payload) {
          const exists = state.projects.some((p: IProject) => p.id === action.payload?.id);
          if (!exists) {
            state.projects.push(action.payload);
          }
        }
      })
      .addCase(fetchProjectById.rejected, (state) => {
        state.currentProjectLoading = 'rejected';
      });
  },
});

export const { setCurrentPage, setCurrentProject, resetProjects } = projectSlice.actions;
export default projectSlice.reducer;