import { useEffect } from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "@/shared/store/store";
import { setUser, logout } from "@/shared/store/slices/auth.slice";
import { getRefreshToken, isRememberMe, setAccessToken, setRefreshToken, setUserData, clearAuthData } from "./features/auth/utils/auth";
import { refreshTokenService } from "./features/auth/services/token.services";
import { useResetPassRedirect } from "./features/auth/hooks/reset-password.hooks";

function App() {
  const dispatch = useAppDispatch();
  useResetPassRedirect();

  useEffect(() => {
    const refreshSession = async () => {
      const storedRefreshToken = getRefreshToken();
      if (!storedRefreshToken) return;

      const rememberMe = isRememberMe();

      try {
        const result = await refreshTokenService(storedRefreshToken);
        
        setAccessToken(result.access_token, rememberMe);
        if (result.refresh_token) {
          setRefreshToken(result.refresh_token, rememberMe);
        }
        setUserData(result.user, rememberMe);

        dispatch(
          setUser({
            user: result.user,
          })
        );
      } catch (error) {
        clearAuthData();
        dispatch(logout());
      }
    };

    refreshSession();

    const intervalId = setInterval(refreshSession, 45 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
