import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from '../../NavbarAdmin';
import './App.css';
const CommandesPage = () => {
  const [commands, setCommands] = useState([]);
  const [livreurs, setLivreurs] = useState([]);
  const [selectedLivreur, setSelectedLivreur] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage

    // Fetch commands with headers
    axios.get('http://127.0.0.1:8000/api/commandes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setCommands(response.data))
      .catch(error => console.error('Error fetching commands:', error));

    // Fetch livreurs with headers
    axios.get('http://127.0.0.1:8000/api/admin/livreurs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setLivreurs(response.data))
      .catch(error => console.error('Error fetching livreurs:', error));
  }, []);

  console.log("commands", commands);
  console.log("livreurs", livreurs);

  // Assign livreur
  const handleAssignLivreur = async (commandeId) => {
    try {
      const token = localStorage.getItem('token');
      const deliveryPersonId = selectedLivreur[commandeId];

      if (!deliveryPersonId) {
        alert('Please select a livreur first.');
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/commands/${commandeId}/assign`,
        { delivery_person_id: deliveryPersonId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Livreur assigned successfully:', response.data);

      // Find the assigned livreur's name
      const assignedLivreur = livreurs.find(livreur => livreur.id === parseInt(deliveryPersonId));

      // Update the specific command with the new livreur's name
      setCommands(prevCommands => 
        prevCommands.map(command => 
          command.id === commandeId 
            ? { ...command, livreur_name: assignedLivreur.name }
            : command
        )
      );

    } catch (error) {
      console.error('Error assigning livreur:', error.response?.data);
    }
  };

  const handleSelectChange = (commandId, event) => {
    setSelectedLivreur({ ...selectedLivreur, [commandId]: event.target.value });
  };

  return (
    <>
      <NavbarAdmin />
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Livrer A</th>
              <th>Status</th>
              <th>Livreur</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(command => (
              <tr key={command.id}>
                <td>{command.id}</td>
                <td>{command.colis.livrer_a}</td>
                <td>{command.status}</td>
                <td>
                  {command.livreur_name || (
                    <select 
                      value={selectedLivreur[command.id] || ''} 
                      onChange={(event) => handleSelectChange(command.id, event)}
                    >
                      <option value="">Select Livreur</option>
                      {livreurs.map(livreur => (
                        <option key={livreur.id} value={livreur.id}>
                          {livreur.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td>
                  {!command.livreur_name && (
                   <button
                   onClick={() => handleAssignLivreur(command.id)}
                   style={{ backgroundColor: '#3e5091', color: 'white', padding: '8px 16px', borderRadius: '4px' }}
                 >
                   Assign
                 </button>
                 
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommandesPage;
