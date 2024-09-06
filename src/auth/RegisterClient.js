import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavbarAdmin from '../NavbarAdmin';

function RegisterClient() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    const token = localStorage.getItem("token");
  
    if (role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [cin, setCin] = useState("");
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("phone:", phone);
    console.log("cin:", cin);
    console.log("adress:", adress);
    console.log("Password:", password);
    console.log("Password Confirmation:", c_password);
    if (password !== c_password) {
        console.error("Passwords do not match");
        // Handle error (e.g., display error message)
        return;
      }
    const userData = {
      name,
      email,
      phone,
      cin,
      adress,
      password,
      c_password,
    };
    console.log("user data",userData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', userData);
      console.log('Registration successful:', response.data);
      navigate("/admin");

      // Handle success (e.g., redirect to login page, display success message)
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <>
      <NavbarAdmin />

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Inscription
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            {/* <div>
              <label htmlFor="role" className="block text-sm font-medium leading-5 text-gray-700">Role</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  id="role"
                  name="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="admin">Admin</option>
                  <option value="client">Client</option>
                  <option value="livreur">Livreur</option>
                </select>
              </div>
            </div> */}

           
            <div className="mt-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Phone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="phone"
                  name="phone"
                  placeholder="user@example.com"
                  type="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="cin"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Cin
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="cin"
                  name="cin"
                  placeholder="w12345"
                  type="text"
                  required
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="address"
                  name="address"
                  placeholder="user@example.com"
                  type="text"
                  required
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  required
                  value={c_password}
                  onChange={(e) => setC_password(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Create account
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  
  );
}

export default RegisterClient;
