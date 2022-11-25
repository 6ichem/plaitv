import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PublicRoute({ isAuthenticated }: any) {
  let location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
