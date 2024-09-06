import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NavbarHome = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        throw new Error('No token found');
      }

      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Clear the token and other user data
      localStorage.removeItem('token');

      // Redirect to the login page or another page
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Token may be expired or invalid');
      } else {
        console.error('Error logging out:', error);
      }
    }
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white bg-opacity-50 border-gray-200 navbar">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <img 
            src="/logo2.png" 
            alt="logo" 
            style={{ width: '180px', height: '120px' }} 
            className="h-auto" 
          />

          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white bg-opacity-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-[#3e5091] rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/contactUs" 
                  className="block py-2 px-3 text-[#3e5091] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Contactez-nous
                </a>
              </li>
              <li>
                <a
                  href="/login" 
                  className="block py-2 px-3 text-[#3e5091] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarHome;
