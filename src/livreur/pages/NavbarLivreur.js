import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NavbarLivreur = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://127.0.0.1:8000/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserName(response.data.name); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
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


  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-[#3e5091] border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img 
  src="/logo.png" 
  alt="logo" 
  style={{ width: '150px', height: '130px' }} 
  className="h-auto" 
/>
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#3e5091] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-[#3e5091] dark:border-gray-700">
    
              <li>
                <a
                  href="/admin"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0"
                  aria-current="page"
                >
                  Livreur
                </a>
              </li>
              {userName && (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-white text-lg flex items-center"
                  >
                    Bonjour, {userName}
                    <svg
                      className="w-5 h-5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white text-black border border-gray-200 rounded shadow-lg">
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
              {/* <li>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:hover:text-white"
                >
                  Logout
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarLivreur;
