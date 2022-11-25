import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRoute({ isAuthenticated }: any) {
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
