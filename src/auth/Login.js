import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavbarHome from '../NavbarHome';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      if (response.data.status === true) {
        // Store the user role in localStorage
        localStorage.setItem("user_role", response.data.role);
        localStorage.setItem("token", response.data.token);

        // Redirect the user based on their role
        if (response.data.role === "admin") {
            console.log("move to admin page");
            navigate("/admin");
        } else if (response.data.role === "client") {
            console.log("move to client page");
            navigate("/client");
        } else if (response.data.role === "livreur") {
            console.log("move to lovreur page");
             navigate("/livreur");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("An error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarHome />

       <div className="flex justify-center items-center h-screen">
      <div className="xl:w-[700px] px-10 h-[400px] rounded-3xl xl:shadow-xl">
        <h1 className="text-center text-3xl font-bold mt-2 mb-2">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <hr />
        <div className="flex justify-center mt-10">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-3 p-5 rounded-md bg-zinc-50 md:w-[500px] w-[300px] outline-indigo-400"
              placeholder="Enter your email"
            />
            <br />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-3 p-5 rounded-md bg-zinc-50 md:w-[500px] w-[300px] outline-indigo-400"
              placeholder="Enter your password"
            />
            <br />
            <br />
            <button
              type="submit"
              className="py-3 bg-indigo-400 text-white w-full rounded-md font-bold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
 
  );
}

export default Login;
