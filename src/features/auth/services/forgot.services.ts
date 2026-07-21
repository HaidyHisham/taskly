const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const forgotPasswordService = async (email: string) => {
  const response = await fetch(`${BASE_URL}/auth/v1/recover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: `${API_KEY}`,
    },
    body: JSON.stringify({ email }),
  });

  try {
    const result = await response.json();

    if (!response.ok)
      throw new Error(result?.msg || 'Failed to recover password');

    return result;  
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to recover password';
    throw new Error(errMsg);
  }
};

/* reset password */
export const resetPassword = async (token: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/v1/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      apikey: `${API_KEY}`,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });

  try {
    const result = await response.json();

    if (!response.ok)
      throw new Error(result?.msg || 'Failed to reset password');

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to reset password';
    throw new Error(errMsg);
  }
};

  
