import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from '../../NavbarAdmin';
import './App.css';

const Payement = () => {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage

        // Fetch commands with headers
        const response = await axios.get('http://127.0.0.1:8000/api/commandesNonPaye', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCommands(response.data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };

    fetchCommands();
  }, []); // Empty dependency array ensures this runs once on component mount


  const Paye = async (colisId) => {
    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
  
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/colis/update-crbt/${colisId}`,
        { crbt_recupere: 'Paye' }, // The new value to set
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Crbt Recupere updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating Crbt Recupere:', error);
    }
  };
  

  return (
    <>
      <NavbarAdmin />
      <div>
        <table>
          <thead>
            <tr>
              <th>ID-Commande</th>
              <th>ID-Colis</th>
              <th>Nom Client</th>
              <th>CRBT</th>
              <th>Crbt Recupere</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(command => (
              <tr key={command.id}>
                <td>{command.id}</td>
                <td>{command.colis_id}</td>
                <td>{command.colis.livrer_a}</td>
                <td>{command.colis.CRBT}</td>
                <td>{command.colis.crbt_recupere}</td>
                <td>
                  <button
                    onClick={() => Paye(command.colis_id)}
                    style={{ backgroundColor: '#3e5091', color: 'white', padding: '8px 16px', borderRadius: '4px' }}
                  >
                    Paye
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Payement;
