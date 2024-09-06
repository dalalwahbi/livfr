import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import components
import InfoCard from '../components/Cards/InfoCard';
import { CartIcon, MoneyIcon } from '../icons';
import RoundIcon from '../components/RoundIcon';
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
} from '@windmill/react-ui';

import NavbarClient from './NavbarClient';

function DashboardClient() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role !== 'client') {
      navigate('/login');
    }
  }, [navigate]);

  // Pagination setup
  const resultsPerPage = 10;

  // Pagination change control
  const onPageChange = (p) => {
    setPage(p);
  };
  const getStatusBgColor = (status) => {
    switch (status) {
      case 'en attente':
        return 'bg-yellow-500'; // Yellow for pending
      case 'attribué':
        return 'bg-blue-500'; // Blue for assigned
      case 'en transit':
        return 'bg-orange-500'; // Orange for in transit
      case 'livré':
        return 'bg-green-500'; // Green for delivered
      case 'annulé':
        return 'bg-red-500'; // Red for canceled
      default:
        return 'bg-gray-500'; // Default gray
    }
  };
  // On page change, load new sliced data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    axiosInstance.get('http://127.0.0.1:8000/api/my_colis')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);  
  console.log('DATA MY COLIS ',data);
  // Calculate the totals
  const totals = useMemo(() => {
    return data.reduce(
      (acc, colis) => {
        const crbt = colis.CRBT ? parseFloat(colis.CRBT) : 0; // Convert to float
        const crbtRecupere = colis.crbt_recupere ? parseFloat(colis.crbt_recupere) : 0; // Convert to float

        if (crbtRecupere === 0) {
          acc.crbtNonPaye += crbt;
        }
        acc.montantDue += crbt;
        acc.totalOrders += 1;
        return acc;
      },
      {
        crbtNonPaye: 0,
        montantDue: 0,
        totalOrders: 0,
      }
    );
  }, [data]);

  // Debugging logs
  useEffect(() => {
    console.log('Totals:', totals);
  }, [totals]);

  // Pagination slicing
  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <>
      <NavbarClient />

      {/* Loading and Error Handling */}
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data: {error.message}</p>}

      {/* Cards */}
      <div className="flex justify-center items-center p-6">
  <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg p-6">
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
      <InfoCard title="CRBT cumulé non payé" value={`DH ${totals.crbtNonPaye.toFixed(2)}`}>
        <RoundIcon
          icon={MoneyIcon}
          iconColorClass="text-green-500 dark:text-green-100"
          bgColorClass="bg-green-100 dark:bg-green-500"
          className="mr-4"
        />
      </InfoCard>
      <InfoCard title="Montant dû" value={`DH ${totals.montantDue.toFixed(2)}`}>
        <RoundIcon
          icon={MoneyIcon}
          iconColorClass="text-green-500 dark:text-green-100"
          bgColorClass="bg-green-100 dark:bg-green-500"
          className="mr-4"
        />
      </InfoCard>
      <InfoCard title="Nombre Total Des Commandes" value={totals.totalOrders}>
        <RoundIcon
          icon={CartIcon}
          iconColorClass="text-blue-500 dark:text-blue-100"
          bgColorClass="bg-blue-100 dark:bg-blue-500"
          className="mr-4"
        />
      </InfoCard>
    </div>
  </div>
</div>

<TableContainer className="bg-white shadow-lg rounded-lg overflow-hidden">
  <Table className="min-w-full divide-y divide-gray-200">
    <TableHeader className="bg-gray-100">
      <tr>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numero</TableCell>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cree le</TableCell>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livrer a</TableCell>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">De</TableCell>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">A</TableCell>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frais</TableCell>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CRBT</TableCell>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CRBT recupere</TableCell>
        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableCell>
      </tr>
    </TableHeader>
    <TableBody className="bg-white divide-y divide-gray-200">
      {paginatedData.map((colis, i) => (
        <TableRow key={i} className="hover:bg-gray-100">
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">N-Colis {colis.id}</div>
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{colis.commande_date}</span>
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{colis.livrer_a}</span>
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{colis.de}</span>
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{colis.ville}</span>
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{colis.frais} DH</span>
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{colis.CRBT} DH</span>
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{colis.crbt_recupere}</span>
          </TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center justify-center">
              <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusBgColor(colis.status)}`}>
                {colis.status}
              </span>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <TableFooter className="bg-gray-100 px-6 py-3">
    <Pagination
      totalResults={data.length}
      resultsPerPage={resultsPerPage}
      label="Table navigation"
      onChange={onPageChange}
      className="text-sm text-gray-500"
    />
  </TableFooter>
</TableContainer>


    </>
  );
}

export default DashboardClient;
