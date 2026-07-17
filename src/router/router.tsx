import LoginPage from "@/features/auth/pages/LoginPage";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUpPage />,
    },
    {
        path: "/sign-in",
        element: <LoginPage
         />,
    },
]);
export default router;