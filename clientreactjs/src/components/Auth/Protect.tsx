import { Navigate, Outlet } from "react-router-dom";

const Protect = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const data = JSON.parse(localStorage.getItem("auth_user") as string);
    if (!data) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(data.role)) {
        if (data.role === 'USER')
            return <Navigate to="/" replace />;
        if (data.role === 'ADMIN')
            return <Navigate to="/admin" replace />;
    }
    return <Outlet />;
};

export default Protect;
