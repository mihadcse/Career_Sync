import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import CompanyDashboard from "../Pages/CompanyDashboard";
import JobAspirantDashboard from "../Pages/JobAspirantDashboard";
import ProtectedRoute from "../Component/ProtectedRoute";
import Statistics from "../Pages/Statistics";
import Company from "../Pages/Company";
import JobApplication from "../Pages/JobApplication";
import Admin from "../Pages/Admin";
import About from "../Pages/About";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/admin", element: <Admin /> },
            { path: "/post-job", element: <CreateJob /> },
            { path: "/login", element: <Login /> },
            { path: "/sign-up", element: <Signup /> },
            { path: "/statistics", element: <Statistics /> },
            { path: "/companies", element: <Company /> },
            { path: "/about", element: <About /> },
            {
                path: "/company-dashboard",
                element: (
                    <ProtectedRoute allowedRoles={["company"]}>
                        <CompanyDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/job-aspirant-dashboard",
                element: (
                    <ProtectedRoute allowedRoles={["job_aspirant"]}>
                        <JobAspirantDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/company-dashboard/applications",
                element: (
                    <ProtectedRoute allowedRoles={["company"]}>
                        <JobApplication />
                    </ProtectedRoute>
                ),
            },
        ]
    },
]);


export default router;