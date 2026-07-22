import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/store/store";
import { logout as logoutAction } from "@/shared/store/slices/auth.slice";
import { logoutService } from "@/features/auth/services/logout.services";
import { getAccessToken, clearAuthData } from "@/features/auth/utils/auth";
import { toast } from "react-toastify";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = getAccessToken();

  const onHandleLogout = async () => {
    setError(null);
    setIsPending(true);

    const completeLocalLogout = () => {
      clearAuthData();
      dispatch(logoutAction());
      navigate("/login");
    };

    if (!token) {
      completeLocalLogout();
      setIsPending(false);
      return;
    }

    try {
      await logoutService(token);
      completeLocalLogout();
    } catch (err: any) {
      const msg = err?.message || "Logout failed, please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsPending(false);
    }
  };

  return { onHandleLogout, isPending, error };
};
