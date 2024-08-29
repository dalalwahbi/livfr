
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import components
import InfoCard from '../components/Cards/InfoCard';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons';
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
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui';

// Import chart.js and react-chartjs-2
import { Doughnut, Line } from 'react-chartjs-2';
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
// Import chart data and options
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData';
import Navbar from '../../Navbar ';
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



function ClientPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role !== "client") {
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
    axiosInstance.get('http://127.0.0.1:8000/api/commandes')
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
      <Navbar />

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">


        <InfoCard title="CRBT cumulé non payé" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Montant dû" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Nombre Total Des Commandes" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>


      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Numero</TableCell>
              <TableCell>Cree le</TableCell>
              <TableCell>Livrer a</TableCell>
              <TableCell>De</TableCell>
              <TableCell>A</TableCell>
              <TableCell>Frais</TableCell>
              <TableCell>CRBT</TableCell>
              <TableCell>CRBT recupere</TableCell>
              <TableCell>Status</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((colis, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                  <p className="font-semibold">N-Colis{colis.colis_id}</p>
                  <div>
                      {/* <p className="text-xs text-gray-600 dark:text-gray-400">{colis.job}</p> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{colis.colis.commande_date}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{colis.colis.livrer_a}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{colis.colis.de}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{colis.colis.ville}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{colis.colis.frais}45 dh</span>
                </TableCell>  
                <TableCell>
                  <span className="text-sm">{colis.colis.CRBT}</span>
                </TableCell>
                <TableCell>
                <span className="text-sm">{colis.colis.crbt_recupere}</span>
                </TableCell>
                <TableCell>
                  <Badge type={colis.status}> {colis.status}</Badge>
                </TableCell>
      
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

   
    </>
  );
}

export default ClientPage;


