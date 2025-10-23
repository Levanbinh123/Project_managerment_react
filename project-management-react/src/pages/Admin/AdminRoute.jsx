import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth); // giả sử auth có user

    if (!user) {
        // chưa login thì về trang login
        return <Navigate to="/login" />;
    }

    if (user.role !== "ROLE_ADMIN") {
        // không phải admin thì về trang home
        return <Navigate to="/" />;
    }

    // nếu là admin thì render component con
    return children;
};

export default AdminRoute;
