const REFRESH_TOKEN_SINGLE_SESSION = 12 * 60 * 60; // 12 hours in seconds
const REMEMBER_ME_TOKEN_MONTHLY = 30 * 24 * 60 * 60; // 30 days in seconds

const ACCESS_TOKEN_KEY = "taskly_access_token";
const REFRESH_TOKEN_KEY = "taskly_refresh_token";
const REFRESH_TOKEN_EXPIRES_AT_KEY = "taskly_refresh_token_expires_at";
const USER_KEY = "taskly_user";
const REMEMBER_ME_KEY = "taskly_remember_me";

export interface IUserData {
  id: string;
  email: string;
  name?: string;
  job_title?: string;
}

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      try {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      } catch {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }
  return null;
};

const setCookie = (name: string, value: string, maxAge?: number): void => {
  let expires = "";
  if (maxAge !== undefined) {
    const date = new Date();
    date.setTime(date.getTime() + maxAge * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(value) || ""}${expires}; path=/; SameSite=Lax; Secure`;
};

const eraseCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure`;
};

export const setAccessToken = (token: string, rememberMe = false, expiresIn = 3600): void => {
  setCookie(ACCESS_TOKEN_KEY, token, expiresIn);

  const refreshTokenMaxAge = rememberMe ? REMEMBER_ME_TOKEN_MONTHLY : REFRESH_TOKEN_SINGLE_SESSION;

  if (rememberMe) {
    setCookie(REMEMBER_ME_KEY, "true", REMEMBER_ME_TOKEN_MONTHLY);
  } else {
    eraseCookie(REMEMBER_ME_KEY);
  }

  const expiresAtMs = Date.now() + refreshTokenMaxAge * 1000;
  setCookie(REFRESH_TOKEN_EXPIRES_AT_KEY, expiresAtMs.toString(), refreshTokenMaxAge);
};

export const getAccessToken = (): string | null => {
  return getCookie(ACCESS_TOKEN_KEY);
};

export const setRefreshToken = (token: string, rememberMe = false): void => {
  const refreshTokenMaxAge = rememberMe ? REMEMBER_ME_TOKEN_MONTHLY : REFRESH_TOKEN_SINGLE_SESSION;
  setCookie(REFRESH_TOKEN_KEY, token, refreshTokenMaxAge);
};

export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN_KEY);
};

export const setUserData = (user: IUserData, rememberMe = false): void => {
  const userMaxAge = rememberMe ? REMEMBER_ME_TOKEN_MONTHLY : REFRESH_TOKEN_SINGLE_SESSION;
  setCookie(USER_KEY, JSON.stringify(user), userMaxAge);
};

export const getUserData = (): IUserData | null => {
  const user = getCookie(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user) as IUserData;
  } catch {
    return null;
  }
};

export const clearAuthData = (): void => {
  eraseCookie(ACCESS_TOKEN_KEY);
  eraseCookie(REFRESH_TOKEN_KEY);
  eraseCookie(REFRESH_TOKEN_EXPIRES_AT_KEY);
  eraseCookie(USER_KEY);
  eraseCookie(REMEMBER_ME_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const isRememberMe = (): boolean => {
  return getCookie(REMEMBER_ME_KEY) === "true";
};
