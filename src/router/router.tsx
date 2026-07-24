import LoginPage from "@/features/auth/pages/LoginPage";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "@/features/auth/utils/auth";
import MasterLayout from "@/layouts/MasterLayout";
import ForgotPage from "@/features/auth/pages/ForgotPage";
import ResetPage from "@/features/auth/pages/ResetPage";
import ProjectPage from "@/features/projects/pages/ProjectPage";
import ProjectsList from "@/features/projects/pages/ProjectsList";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={isAuthenticated() ? "/project" : "/login"} replace />,
    },
    {
        path: "/sign-up",
        element: <SignUpPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPage />,
    },
    {
        path: "/project",
        element: <MasterLayout />,
        children: [
            {
                index: true,
                element: <ProjectsList />
            },
            {
                path: "add",
                element: <ProjectPage mode="add" />
            },
            {
                path: "edit/:id",
                element: <ProjectPage mode="edit" />
            },

            {
                path: ":projectId",
                element: <Navigate to="epics" replace />,
            },
            {
                path: ":projectId/epics",
                element: <div className="p-6">Project Epics Area</div>,
            },
            {
                path: ":projectId/tasks",
                element: <div className="p-6">Project Tasks Area</div>,
            },
            {
                path: ":projectId/members",
                element: <div className="p-6">Project Members Area</div>,
            },
            {
                path: ":projectId/details",
                element: <div className="p-6">Project Details Area</div>,
            },
        ],
    },
]);
export default router;