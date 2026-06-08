/**
 * Attendance Page
 * Attendance management
 */

import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';
import attendanceService from '../services/attendanceService';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await attendanceService.getAttendance({ date: selectedDate });
      setAttendance(response.data);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'studentId', label: 'Student', render: (row) => row.studentId?.firstName || 'N/A' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (row) => <span className={`badge ${row.status === 'present' ? 'badge-success' : 'badge-danger'}`}>{row.status}</span> }
  ];

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-dark mb-6">Attendance</h1>
        <div className="card mb-6">
          <label className="label">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="card">
          <DataTable columns={columns} data={attendance} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Attendance;