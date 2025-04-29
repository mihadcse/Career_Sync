import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If user role is not in allowed roles, redirect to login
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
