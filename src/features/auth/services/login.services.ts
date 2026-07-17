const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
import type { ILogin } from "../types/login.types";

export const loginService = async (data: ILogin) => {
  const response = await fetch(`${BASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: `${API_KEY}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.error_description || result?.msg || "Failed to log in");
  }
  return result;
};
