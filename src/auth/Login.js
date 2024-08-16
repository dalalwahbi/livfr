import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Email:", email);
//     console.log("Password:", password);
//     const userData = {
//       email,
//       password,
//     };
//     console.log("user data",userData);
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/login', userData);
//       console.log('Registration successful:', response.data);
//       // Handle success (e.g., redirect to login page, display success message)
//     } catch (error) {
//       console.error('Error registering:', error.response ? error.response.data : error.message);
//       // Handle error (e.g., display error message)
//     }
//   };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Assume that the login response contains the token
      const token = response.data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch the profile to get the user's role
      const profileResponse = await axios.get("http://127.0.0.1:8000/api/profile");

      const userRole = profileResponse.data.role;

      // Redirect based on user role
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "client") {
        navigate("/client");
      } else if (userRole === "livreur") {
        navigate("/livreur");
      } else {
        setError("Unknown user role");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="xl:w-[700px] px-10 h-[400px] rounded-3xl xl:shadow-xl">
        <h1 className="text-center text-3xl font-bold mt-2 mb-2">Login</h1>
        {error && <p>{error}</p>}
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

            {/* <div className="flex justify-end mt-3 mb-4">
              <a href="#" className="text-blue-700">
                Forgot password
              </a>
            </div> */}

            <button
              type="submit"
              className="py-3 bg-indigo-400 text-white w-full rounded-md font-bold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

