import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/services";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles = [], redirectPath = '/'}) => {
    // const user = getCurrentUser();
    const {user} = useAuth();
    
    const isAllowed = user && (allowedRoles.length === 0 || allowedRoles.includes(user.role));

    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;