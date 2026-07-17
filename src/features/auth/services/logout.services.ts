const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const logoutService = async (token: string) => {
  const response = await fetch(`${BASE_URL}/auth/v1/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: `${API_KEY}`,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage = "Logout failed, please try again.";
    try {
      const result = await response.json();
      if (result?.error_description || result?.msg) {
        errorMessage = result.error_description || result.msg;
      }
    } catch (e) {
      
    }
    throw new Error(errorMessage);
  }

  return true;
};
