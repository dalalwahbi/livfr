import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./Home";
import DashboardClient from "./client/pages/DashboardClient";
import DashboardAdmin from "./admin/pages/DashboardAdmin";
import Payement from "./admin/pages/Payement";
import DashboardLivreur from "./livreur/pages/DashboardLivreur";
import CommandesPage from "./admin/pages/CommandesPage";
import Commandes from "./admin/pages/Commandes";

import Register2 from "./auth/Register2";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Unauthorized"; 
import ContactUs from "./ContactUs";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactUs" element={<ContactUs />} />
        {/* <Route path="/commandes" element={<CommandesPage />} /> */}

        {/* Protect routes for admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
                <Route
          path="/commandes-Associe"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <CommandesPage />
            </PrivateRoute>
          }
        />
                
                <Route
          path="/commandes"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Commandes/>
            </PrivateRoute>
          }
        />
             <Route
          path="/register"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Register2 />
            </PrivateRoute>
          }
        />
                  <Route
          path="/payement"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Payement />
            </PrivateRoute>
          }
        />
        {/* Protect routes for client */}

        <Route
          path="/client"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <DashboardClient />
            </PrivateRoute>
          }
        />
        {/* Protect routes for livreur */}

        <Route
          path="/livreur"
          element={
            <PrivateRoute allowedRoles={["livreur"]}>
              <DashboardLivreur />
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
