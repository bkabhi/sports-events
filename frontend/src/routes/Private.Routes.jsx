import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
    const { accessToken } = useSelector((store) => store.auth);

    if (!accessToken) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoutes;
