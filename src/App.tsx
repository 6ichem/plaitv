import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ForgotPasswrod from "./plaitv/Auth/ForgotPassword";
import Login from "./plaitv/Auth/Login";
import Register from "./plaitv/Auth/Register";
import { ROUTE_PATHS } from "./router/constants";
import { Toaster } from "react-hot-toast";
import ValidateEmail from "./plaitv/Auth/ValidateEmail";
import ResetPassword from "./plaitv/Auth/ResetPassword";
import Dashboard from "./plaitv/Dashboard";
import AuthRoute from "./router/AuthRoute";
import PublicRoute from "./router/PublicRoute";
import { getToken } from "./http/utils";

function App() {
  const isAuthenticated = getToken();

  return (
    <Router>
      <Toaster />

      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />

        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
          <Route path={ROUTE_PATHS.REGISTER} element={<Register />} />
          <Route
            path={ROUTE_PATHS.FORGOT_PASSWORD}
            element={<ForgotPasswrod />}
          />
          <Route
            path={ROUTE_PATHS.VALIDATE_EMAIL}
            element={<ValidateEmail />}
          />
          <Route
            path={ROUTE_PATHS.RESET_PASSWORD}
            element={<ResetPassword />}
          />
        </Route>

        <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
