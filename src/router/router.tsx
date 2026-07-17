import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "../features/auth/SignUpPage";

const router = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUpPage />,
    },
]);
export default router;