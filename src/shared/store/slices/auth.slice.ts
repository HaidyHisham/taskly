
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  getAccessToken,
  getUserData,
  type IUserData,
} from "@/features/auth/utils/auth";

interface AuthState {
  user: IUserData | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: getUserData(),
  isAuthenticated: !!getAccessToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: IUserData }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;