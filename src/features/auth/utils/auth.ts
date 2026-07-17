const ACCESS_TOKEN_KEY = "taskly_access_token";
const REFRESH_TOKEN_KEY = "taskly_refresh_token";
const USER_KEY = "taskly_user";
const AUTH_TIMESTAMP_KEY = "taskly_auth_timestamp";
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

export interface IUserData {
  id: string;
  email: string;
  name?: string;
  job_title?: string;
}

const isExpired = (): boolean => {
  const timestamp = localStorage.getItem(AUTH_TIMESTAMP_KEY);
  if (!timestamp) return false;
  const timePassed = Date.now() - parseInt(timestamp, 10);
  return timePassed > ONE_MONTH_MS;
};

export const setAccessToken = (token: string, rememberMe = false): void => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, token);
  if (rememberMe) {
    localStorage.setItem(AUTH_TIMESTAMP_KEY, Date.now().toString());
  }
};

export const getAccessToken = (): string | null => {
  if (isExpired()) {
    clearAuthData();
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setRefreshToken = (token: string, rememberMe = false): void => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
  if (isExpired()) {
    clearAuthData();
    return null;
  }
  return localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setUserData = (user: IUserData, rememberMe = false): void => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserData = (): IUserData | null => {
  if (isExpired()) {
    clearAuthData();
    return null;
  }
  const user = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
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
  localStorage.removeItem(AUTH_TIMESTAMP_KEY);

  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
