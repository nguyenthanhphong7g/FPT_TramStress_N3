import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/services";

const ProtectedRoute = ({ allowedRoles = [], redirectPath = '/'}) => {
    const user = getCurrentUser();
    
    const isAllowed = user && (allowedRoles.length === 0 || allowedRoles.includes(user.role));

    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;