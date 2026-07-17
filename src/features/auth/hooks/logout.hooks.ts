import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout as logoutAction } from "@/features/auth/store/authSlice";
import { logoutService } from "@/features/auth/services/logout.services";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const onHandleLogout = async () => {
    setError(null);
    setIsPending(true);

    const completeLocalLogout = () => {
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
      const lowerMsg = msg.toLowerCase();

      if (
        lowerMsg.includes("jwt") ||
        lowerMsg.includes("expired") ||
        lowerMsg.includes("token") ||
        lowerMsg.includes("signature") ||
        lowerMsg.includes("claim")
      ) {
        completeLocalLogout();
      } else {
        setError(msg);
        alert(msg);
      }
    } finally {
      setIsPending(false);
    }
  };

  return { onHandleLogout, isPending, error };
};
