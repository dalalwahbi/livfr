import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import components
import InfoCard from '../components/Cards/InfoCard';
import { CartIcon, MoneyIcon } from '../icons';
import RoundIcon from '../components/RoundIcon';
import response from '../utils/demo/tableData';
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from '@windmill/react-ui';

// Import chart.js and react-chartjs-2
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { FaTrashAlt } from 'react-icons/fa'; // Import the delete icon

import NavbarAdmin from '../../NavbarAdmin';
// Register required chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function DashboardAdmin() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const role = localStorage.getItem("user_role");
  const token = localStorage.getItem("token");

  if (role !== "admin") {
    navigate("/login");
  }
}, [navigate]);

  // Pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // Pagination change control
  function onPageChange(p) {
    setPage(p);
  }
  const handleDelete = async (livId) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage or wherever it's stored

    try {
      // Log the deletion action
      console.log('Deleting liv with ID:', livId);
  
      // Make the DELETE request to the API
      const response = await axios.delete(`http://127.0.0.1:8000/api/admin/livreur/${livId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
    
      // Handle the response
      console.log('Response:', response.data);
      alert('Livreur deleted successfully');
      window.location.reload(); 
      // Optionally, you can refresh the list of livreurs or update the UI after deletion
      // Example: fetchLivreurs(); // A function to reload the livreur list
    } catch (error) {
      console.error('Error deleting livreur:', error.response ? error.response.data : error.message);
      alert('Failed to delete livreur. Please try again.');
    }
  };
  
  // On page change, load new sliced data
  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user_role');
    console.log("token",token);
    console.log("role",role);

    // Create an Axios instance with the authorization header
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token
        Accept:'application/json'
      },
    });

    // Fetch data from the API
    axiosInstance.get('http://127.0.0.1:8000/api/admin/livreurs')
      .then(response => {
        setData(response.data);  // Update the state with the fetched data
        setLoading(false);        // Set loading to false after data is fetched
      })
      .catch(error => {
        setError(error);          // Handle any errors
        setLoading(false);        // Set loading to false in case of an error
      });
  }, []);  
  console.log("data",data);
 


  return (
    <>
      {/* <PageTitle>Dashboard</PageTitle> */}
      <NavbarAdmin />


      <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Cin</TableCell>
            <TableCell>Adress</TableCell>
            <TableCell>Date D'inscription</TableCell>
            <TableCell>Action</TableCell> {/* New Action column */}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((liv, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <p className="font-semibold">Liv{liv.id}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{liv.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{liv.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{liv.role}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{liv.phone}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{liv.cin}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{liv.adress}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{liv.created_at}</span>
              </TableCell>
              {/* <TableCell>
                <Badge type={liv.status}> {liv.status}</Badge>
              </TableCell> */}
              <TableCell>
                {/* Delete icon with onClick handler */}
                <FaTrashAlt 
                  className="text-red-600 cursor-pointer" 
                  onClick={() => handleDelete(liv.id)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </Table>
    </TableContainer>

   
    </>
  );
}

export default DashboardAdmin;
