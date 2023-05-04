import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { AuthContext } from "./AuthContext";

interface Props {
    component: React.FC<any>;
    path: string;
    exact?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
    component: Component,
    path,
    exact,
}) => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route
            path={path}
            render={(props: any) =>
                isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
};

export default ProtectedRoute;
