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


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/post-job", element: <CreateJob /> },
            { path: "/login", element: <Login /> },
            { path: "/sign-up", element: <Signup /> }, 
            { path: "/statistics", element: <Statistics /> },
            { path: "/companies", element: <Company /> },
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
            { path: "/company-dashboard/applications/:jobId", element: <JobApplication /> },
        ]
    },
]);


export default router;