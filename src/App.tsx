import React, { useEffect } from "react";
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
import { getLocalAccessToken, newAccessToken } from "./http/utils";
import Home from "./plaitv/Home";
import Explore from "./plaitv/Explore";
import Profile from "./plaitv/Explore/components/Profile";
import PublicPlaylistView from "./plaitv/Explore/components/PublicPlaylistView";

function App() {
  const isAuthenticated = getLocalAccessToken();

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

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
          <Route path={ROUTE_PATHS.LANDING} element={<Home />} />
        </Route>

        <Route path={ROUTE_PATHS.EXPLORE} element={<Explore />} />
        <Route path={ROUTE_PATHS.PROFILE} element={<Profile />} />
        <Route path={ROUTE_PATHS.PLAYLIST} element={<PublicPlaylistView />} />

        <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
