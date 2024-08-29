import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableContainer,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  Pagination,
  Badge,
  Button
} from '@windmill/react-ui';
import NavbarLivreur from './NavbarLivreur';


function DashboardLivreur() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role !== 'livreur') {
      navigate('/login');
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/livreur/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/livreur/orders/${id}/status`, 
      { status: newStatus }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchOrders();  // Refresh orders after status change
    } catch (error) {
      console.error('Error updating status', error);
    }
  };
  console.log("orders", orders);

  return (
    <>
      <NavbarLivreur />
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Numero</TableCell>
              <TableCell>Cree le</TableCell>
              <TableCell>Livrer a</TableCell>
              <TableCell>A</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Adress</TableCell>
              <TableCell>CRBT</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivered At</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {orders.map((order, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">N-Colis {order.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{order.colis.created_at}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{order.colis.livrer_a}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{order.colis.ville}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{order.colis.phone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{order.colis.adress}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{order.colis.CRBT}</span>
                </TableCell>
                <TableCell>
                  <Badge type={order.status === 'livré' ? 'success' : 'warning'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {order.status === 'livré' && order.delivered_at 
                      ? new Date(order.delivered_at).toLocaleString() 
                      : ''}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleStatusChange(order.id, 'livré')}
                    disabled={order.status === 'livré'}
                  >
                    Livré
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(order.id, 'annulé')}
                    disabled={order.status === 'annulé'}
                  >
                    Annulé
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={orders.length}
            resultsPerPage={resultsPerPage}
            onChange={setPage}
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default DashboardLivreur;
