const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const logoutService = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: `${API_KEY}`,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to logout');

    return true;
  } catch (error) {
    throw new Error('Failed to logout');
  }
};

