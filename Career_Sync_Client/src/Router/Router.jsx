import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import CompanyDashboard from "../Pages/CompanyDashboard";
import JobAspirantDashboard from "../Pages/JobAspirantDashboard";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/post-job", element: <CreateJob /> },
            { path: "/login", element: <Login /> },
            { path: "/sign-up", element: <Signup /> },
            { path: "/company-dashboard", element: <CompanyDashboard /> },
            { path: "/job-aspirant-dashboard", element: <JobAspirantDashboard /> },
        ]
    },
]);


export default router;