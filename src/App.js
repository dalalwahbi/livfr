import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import your existing components
import Login from './auth/Login';
import Home from './Home';
import Register2 from './auth/Register2';

// Import role-specific pages
import AdminPage from './admin/AdminPage';
import ClientPage from './client/ClientPage';
import LivreurPage from './livreur/LivreurPage';

import './index.css';

function App() {
  // const [userRole, setUserRole] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/api/profile');
  //       setUserRole(response.data.role);
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       console.error('Error fetching profile:', error);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  // if (!isAuthenticated) {
  //   return (
  //     <Router>
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/register2" element={<Register2 />} />
  //         <Route path="*" element={<Navigate to="/login" />} />
  //       </Routes>
  //     </Router>
  //   );
  // }

  return (
    // <Router>
    //   <div>
    //     <Routes>
    //       {/* Static routes */}
    //       <Route path="/" element={<Home />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register2" element={<Register2 />} />

    //       {/* Role-based routes */}
    //       <Route path="/admin" element={userRole === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
    //       <Route path="/client" element={userRole === 'client' ? <ClientPage /> : <Navigate to="/" />} />
    //       <Route path="/livreur" element={userRole === 'livreur' ? <LivreurPage /> : <Navigate to="/" />} />

    //       {/* Default redirection based on user role */}
    //       <Route path="*" element={
    //         userRole === 'admin' ? <Navigate to="/admin" /> :
    //         userRole === 'client' ? <Navigate to="/client" /> :
    //         userRole === 'livreur' ? <Navigate to="/livreur" /> :
    //         <Navigate to="/" />
    //       } />
    //     </Routes>
    //   </div>
    // </Router>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register2" element={<Register2 />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/client" element={<ClientPage />} />
      <Route path="/livreur" element={<LivreurPage />} />
    </Routes>
  </Router>
  );
}

export default App;
