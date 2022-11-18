import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./plaitv/Login";
import Register from "./plaitv/Register";
import { ROUTE_PATHS } from "./router/constants";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATHS.REGISTER} element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
