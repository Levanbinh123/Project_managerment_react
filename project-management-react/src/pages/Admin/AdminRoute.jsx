import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth); // giả sử auth có user

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "ROLE_ADMIN") {
        return <Navigate to="/" />;
    }
    return children;
};
export default AdminRoute;
