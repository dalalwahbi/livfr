import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./Home";
import AdminPage from "./admin/AdminPage";
import ClientPage from "./client/ClientPage";
import LivreurPage from "./livreur/LivreurPage";
import Register2 from "./auth/Register2";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Unauthorized"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register2" element={<Register2 />} />

        {/* Protect routes based on role */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/client"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/livreur"
          element={
            <PrivateRoute allowedRoles={["livreur"]}>
              <LivreurPage />
            </PrivateRoute>
          }
        />

        {/* Route for unauthorized access */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
