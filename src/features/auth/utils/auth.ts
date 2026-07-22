const ACCESS_TOKEN_KEY = "taskly_access_token";
const REFRESH_TOKEN_KEY = "taskly_refresh_token";
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

const setCookie = (name: string, value: string, rememberMe = false): void => {
  let expires = "";
  if (rememberMe) {
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(value) || ""}${expires}; path=/; SameSite=Lax; Secure`;
};

const eraseCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure`;
};

export const setAccessToken = (token: string, rememberMe = false): void => {
  setCookie(ACCESS_TOKEN_KEY, token, rememberMe);
  if (rememberMe) {
    setCookie(REMEMBER_ME_KEY, "true", true);
  } else {
    eraseCookie(REMEMBER_ME_KEY);
  }
};

export const getAccessToken = (): string | null => {
  return getCookie(ACCESS_TOKEN_KEY);
};

export const setRefreshToken = (token: string, rememberMe = false): void => {
  setCookie(REFRESH_TOKEN_KEY, token, rememberMe);
};

export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN_KEY);
};

export const setUserData = (user: IUserData, rememberMe = false): void => {
  setCookie(USER_KEY, JSON.stringify(user), rememberMe);
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
  eraseCookie(USER_KEY);
  eraseCookie(REMEMBER_ME_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const isRememberMe = (): boolean => {
  return getCookie(REMEMBER_ME_KEY) === "true";
};
