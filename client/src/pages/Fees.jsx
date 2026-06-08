/**
 * Fees Page
 * Fees management
 */

import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';
import feesService from '../services/feesService';

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const response = await feesService.getFees();
      setFees(response.data);
      setStats({
        pending: response.totalPending,
        collected: response.totalCollected
      });
    } catch (error) {
      console.error('Failed to fetch fees:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'studentId', label: 'Student' },
    { key: 'month', label: 'Month' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', render: (row) => <span className={`badge ${row.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{row.status}</span> }
  ];

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-dark mb-6">Fees Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <p className="text-gray-600 text-sm">Total Collected</p>
            <p className="text-3xl font-bold text-green-600 mt-2">₹{stats.collected || 0}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Pending Fees</p>
            <p className="text-3xl font-bold text-red-600 mt-2">₹{stats.pending || 0}</p>
          </div>
        </div>
        <div className="card">
          <DataTable columns={columns} data={fees} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Fees;