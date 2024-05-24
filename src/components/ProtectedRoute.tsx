import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath: string;
  isAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath,
  isAuth,
}) => {
  return isAuth ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
