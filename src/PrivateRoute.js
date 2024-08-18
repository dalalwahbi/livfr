import React from "react";
import { Navigate } from "react-router-dom";

const getUserRole = () => {
  return localStorage.getItem("user_role");
};

function PrivateRoute({ allowedRoles, children }) {
  const userRole = getUserRole();

  return allowedRoles.includes(userRole) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
}

export default PrivateRoute;
