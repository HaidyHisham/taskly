import LoginPage from "@/features/auth/pages/LoginPage";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "@/features/auth/utils/auth";
import MasterLayout from "@/layouts/MasterLayout";
import ForgotPage from "@/features/auth/pages/ForgotPage";
import ResetPage from "@/features/auth/pages/ResetPage";
import ProjectPage from "@/features/projects/pages/ProjectPage";
import ProjectsList from "@/features/projects/pages/ProjectsList";
import MembersList from "@/features/members/pages/MembersList";
import AddNewEpic from "@/features/epics/pages/AddNewEpic";
import EpicItem from "@/features/epics/components/EpicItem";
import EpicList from "@/features/epics/pages/EpicList";


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
                path: ":projectId/edit",
                element: <ProjectPage mode="edit" />
            },

            {
                path: ":projectId",
                element: <Navigate to="epics" replace />,
            },
            {
                path: ":projectId/epics",
                element: <EpicList />
            },
            {
                path: ":projectId/epics/:epicId",
                element: <EpicList />
            },
            {
                path: ":projectId/epics/new",
                element: <AddNewEpic />
            },
            {
                path: ":projectId/tasks",
                element: <div className="p-6">Project Tasks Area</div>,
            },
            {
                path: ":projectId/members",
                element: <MembersList />,
            },
            {
                path: ":projectId/details",
                element: <div className="p-6">Project Details Area</div>,
            },

        ],
    },
]);
export default router;