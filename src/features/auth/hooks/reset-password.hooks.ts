import { useEffect } from "react";
import { toast } from "react-toastify";

export const useResetPassRedirect = () => {
  useEffect(() => {
    if (!window.location.hash) return;

    const hashValue = window.location.hash.substring(1);
    const params = new URLSearchParams(hashValue);

    const accessToken = params.get('access_token');
    const type = params.get('type');

    if (type === 'recovery' && accessToken) {
      window.location.href = `/reset-password?access_token=${accessToken}`;
    } else if (type === 'recovery' && !accessToken) {
      toast.error('Invalid or expired reset link.');
    }
  }, []);
};
