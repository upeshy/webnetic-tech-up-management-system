/**
 * Teachers Page
 * Teacher management
 */

import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import teacherService from '../services/teacherService';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await teacherService.getAllTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'firstName', label: 'Name' },
    { key: 'subject', label: 'Subject' },
    { key: 'qualification', label: 'Qualification' },
    { key: 'experience', label: 'Experience' },
    { key: 'salary', label: 'Salary' }
  ];

  const filteredTeachers = teachers.filter(t =>
    t.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-dark mb-6">Teachers</h1>
        <div className="mb-6">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search teachers..." />
        </div>
        <div className="card">
          <DataTable columns={columns} data={filteredTeachers} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Teachers;