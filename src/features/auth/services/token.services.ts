const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const refreshTokenService = async (refreshToken: string) => {
  const response = await fetch(`${BASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: `${API_KEY}`,
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.error_description || "Session refresh failed");
  }
  return result;
};
