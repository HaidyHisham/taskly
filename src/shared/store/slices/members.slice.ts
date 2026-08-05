import { type IMember } from '@/features/members/types/members.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessToken } from '@/features/auth/utils/auth';
import { getMembers } from '@/features/members/services/members.services';

// fetch paginated members
export const fetchMembers = createAsyncThunk(
  'members/fetch',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authenticated user found. Please login.');
      }
      return await getMembers({ accessToken: token, projectId });
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
  members: IMember[];
}

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    loading: 'pending',
    error: null,
    members: [],
  } as IInitialState,
  reducers: {
    resetMembers: (state) => {
      state.loading = 'pending';
      state.members = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = 'success';
        state.members = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || action.payload?.response?.data || [];
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = (action.payload as string) || 'Failed to fetch members';
      });
  },
});

export const { resetMembers } = membersSlice.actions;

export default membersSlice.reducer;