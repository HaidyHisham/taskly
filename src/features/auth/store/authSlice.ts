import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  getAccessToken,
  getRefreshToken,
  getUserData,
  setAccessToken,
  setRefreshToken,
  setUserData,
  clearAuthData,
  type IUserData,
} from "../utils/auth";

interface AuthState {
  user: IUserData | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: getUserData(),
  token: getAccessToken(),
  refreshToken: getRefreshToken(),
  isAuthenticated: !!getAccessToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        user: IUserData;
        accessToken: string;
        refreshToken?: string;
      }>
    ) {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;

      setUserData(user);
      setAccessToken(accessToken);

      if (refreshToken) {
        state.refreshToken = refreshToken;
        setRefreshToken(refreshToken);
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      clearAuthData();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
