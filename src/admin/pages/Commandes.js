import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from '../../NavbarAdmin';
import './App.css';

const Commandes = () => {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
        const response = await axios.get('http://127.0.0.1:8000/api/commandes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCommands(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching commands');
        setLoading(false);
        console.error('Error fetching commands:', error);
      }
    };

    fetchCommands();

    // Optional cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavbarAdmin />
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Livrer A</th>
              <th>Address</th>
              <th>Phone</th>
              <th>CRBT</th>
              <th>Valeur</th>
              <th>CRBT Recupere</th>
              <th>Livraison Person ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(command => (
              <tr key={command.id}>
                <td>{command.id}</td>
                <td>{command.colis?.livrer_a}</td>
                <td>{command.colis?.adress}</td>
                <td>{command.colis?.phone}</td>
                <td>{command.colis?.CRBT}</td>
                <td>{command.colis?.valeur}</td>
                <td>{command.colis?.crbt_recupere}</td>
                <td>{command.delivery_person_id || 'Not Assigned'}</td>
                <td>{command.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Commandes;
