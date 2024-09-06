import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NavbarClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    livrer_a: '',
    phone: '',
    adress: '',
    de: '',
    ville: '',
    CRBT: '',
    valeur: ''
  });
  

  
  
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  console.log("form data",formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/colis',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Success:', response.data);
      closeModal();
    } catch (error) {
      console.error('Error submitting the form:', error);
      // Provide user feedback here
    }
  };

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
  const cities = [
    "Casablanca", "Fès", "Marrakech", "Tangier", "Sale", "Rabat", "Meknès", "Oujda-Angad", "Kenitra", "Agadir",
    "Tétouan", "Taourirt", "Temara", "Safi", "Khénifra", "El Jadid", "Laâyoune", "Mohammedia", "Kouribga", "Béni Mellal",
    "Ait Melloul", "Nador", "Taza", "Settat", "Barrechid", "Al Khmissat", "Inezgane", "Ksar El Kebir", "My Drarga",
    "Larache", "Guelmim", "Berkane", "Ad Dakhla", "Bouskoura", "Al Fqih Ben Çalah", "Oued Zem", "Sidi Slimane",
    "Errachidia", "Guercif", "Oulad Teïma", "Ben Guerir", "Sefrou", "Fnidq", "Sidi Qacem", "Tiznit", "Moulay Abdallah",
    "Youssoufia", "Martil", "Aïn Harrouda", "Souq Sebt Oulad Nemma", "Skhirate", "Ouezzane", "Sidi Yahya Zaer",
    "Al Hoceïma", "M’diq", "Midalt", "Azrou", "El Kelaa des Srarhna", "Ain El Aouda", "Beni Yakhlef", "Ad Darwa",
    "Al Aaroui", "Qasbat Tadla", "Boujad", "Jerada", "Mrirt", "El Aïoun", "Azemmour", "Temsia", "Zagora", "Ait Ourir",
    "Aziylal", "Sidi Yahia El Gharb", "Biougra", "Zaïo", "Aguelmous", "El Hajeb", "Zeghanghane", "Imzouren", "Tit Mellil",
    "Mechraa Bel Ksiri", "Al ’Attawia", "Demnat", "Arfoud", "Tameslouht", "Bou Arfa", "Sidi Smai’il", "Souk et Tnine Jorf el Mellah",
    "Mehdya", "Aïn Taoujdat", "Chichaoua", "Tahla", "Oulad Yaïch", "Moulay Bousselham", "Iheddadene", "Missour", 
    "Zawyat ech Cheïkh", "Bouknadel", "Oulad Tayeb", "Oulad Barhil", "Bir Jdid", "Tifariti"
  ];
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
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
            <div className="flex items-center space-x-4">
              <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-[#3e5091] dark:border-gray-700">
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0"
                  >
                    Colis
                  </Link>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={openModal}
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:hover:text-white"
                  >
                    Créer un colis
                  </a>
                </li>
              </ul>

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
            </div>
          </div>
        </div>
      </nav>

      {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="p-4">
          <span
            className="close text-black float-right cursor-pointer"
            onClick={closeModal}
            aria-label="Close Modal"
          >
            &times;
          </span>
          <h2 className="text-xl font-semibold mb-4">Créer colis</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="livrer_a"
              className="w-full p-2 border rounded mb-4"
              placeholder="Nom et prénom"
              value={formData.livrer_a}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="phone"
              className="w-full p-2 border rounded mb-4"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="adress"
              className="w-full p-2 border rounded mb-4"
              placeholder="Adresse"
              value={formData.adress}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="address2"
              className="w-full p-2 border rounded mb-4"
              placeholder="Adresse 2"
              value={formData.address2}
              onChange={handleChange}
            />
    
            <div className="mb-4">
              <label htmlFor="city-de" className="block text-sm font-medium text-gray-700">
                De
              </label>
              <select
  id="de"
  name="de"
  onChange={handleChange}
  value={formData.de}
  className="w-full p-2 border rounded mb-4 bg-white"
>
  <option value="" disabled>
    Select ville
  </option>
  {cities.map((city, index) => (
    <option key={index} value={city}>
      {city}
    </option>
  ))}
</select>
            </div>
    
            <div className="mb-4">
              <label htmlFor="city-a" className="block text-sm font-medium text-gray-700">
                À
              </label>
              <select
  id="ville"
  name="ville"
  onChange={handleChange}
  value={formData.ville}
  className="w-full p-2 border rounded mb-4 bg-white"
>
  <option value="" disabled>
    Select ville
  </option>
  {cities.map((city, index) => (
    <option key={index} value={city}>
      {city}
    </option>
  ))}
</select>
            </div>
                
            <input
              type="number"
              id="CRBT"
              className="w-full p-2 border rounded mb-4"
              placeholder="CRBT"
              value={formData.CRBT}
              onChange={handleChange}
            />
            
                   <input
              type="number"
              id="valeur"
              className="w-full p-2 border rounded mb-4"
              placeholder="valeur"
              value={formData.valeur}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Soumettre
            </button>
          </form>
        </div>
      </div>
    </div>
    
      )}
    </>
  );
};

export default NavbarClient;
