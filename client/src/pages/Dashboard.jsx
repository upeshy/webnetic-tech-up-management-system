/**
 * Dashboard Page
 * Main dashboard with statistics
 */

import { useState, useEffect } from 'react';
import { FiUsers, FiBook, FiCalendar, FiDollarSign } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import DashboardCard from '../components/DashboardCard';
import Loader from '../components/Loader';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <MainLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray-500 mt-2">Welcome to Smart School ERP System</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Students"
            value={stats?.totalStudents || 0}
            icon={FiUsers}
            color="primary"
            trend={2.5}
          />
          <DashboardCard
            title="Total Teachers"
            value={stats?.totalTeachers || 0}
            icon={FiBook}
            color="secondary"
            trend={1.2}
          />
          <DashboardCard
            title="Attendance"
            value={`${stats?.attendancePercentage || 0}%`}
            icon={FiCalendar}
            color="warning"
          />
          <DashboardCard
            title="Pending Fees"
            value={`₹${stats?.pendingFees || 0}`}
            icon={FiDollarSign}
            color="danger"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-dark mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="btn-primary w-full">Add New Student</button>
              <button className="btn-secondary w-full">Mark Attendance</button>
              <button className="btn-outline w-full">View Reports</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-dark mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              {stats?.recentNotifications?.map((notif, idx) => (
                <div key={idx} className="p-3 bg-gray-100 rounded-lg">
                  <p className="font-medium text-dark text-sm">{notif.title}</p>
                  <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;