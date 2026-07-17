const ACCESS_TOKEN_KEY = "taskly_access_token";
const REFRESH_TOKEN_KEY = "taskly_refresh_token";
const USER_KEY = "taskly_user";

export interface IUserData {
  id: string;
  email: string;
  name?: string;
  job_title?: string;
}

export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setUserData = (user: IUserData): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserData = (): IUserData | null => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user) as IUserData;
  } catch {
    return null;
  }
};

export const clearAuthData = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
