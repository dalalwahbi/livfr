import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ClientPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role !== "client") {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <h1>Client Dashboard</h1>
      Client specific content here
    </div>
  );
}

export default ClientPage;
