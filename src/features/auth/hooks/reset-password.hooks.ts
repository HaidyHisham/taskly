import { useEffect } from "react";
import { toast } from "react-toastify";

export const useResetPassRedirect = () => {
  const hash = window.location.hash;
  const hasRecovery = hash && hash.includes("type=recovery");
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get('access_token');


  if (hasRecovery && accessToken) {
    window.location.href = `/reset-password?access_token=${accessToken}`;
  }
  useEffect(() => {
    if (hasRecovery && !accessToken) {
      toast.error('Invalid or expired reset link.');
    }
  }, [hasRecovery, accessToken]);
};
