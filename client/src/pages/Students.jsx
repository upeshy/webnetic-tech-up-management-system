/**
 * Students Page
 * Student management
 */

import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import studentService from '../services/studentService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentService.getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await studentService.deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'admissionNumber', label: 'Admission #' },
    { key: 'class', label: 'Class' },
    { key: 'section', label: 'Section' }
  ];

  const filteredStudents = students.filter(s =>
    s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-dark">Students</h1>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            + Add Student
          </button>
        </div>

        <div className="mb-6">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search students..." />
        </div>

        <div className="card">
          <DataTable
            columns={columns}
            data={filteredStudents}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Add Student Modal */}
      <Modal isOpen={isModalOpen} title="Add Student" onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <FormInput label="First Name" name="firstName" />
          <FormInput label="Last Name" name="lastName" />
          <FormInput label="Class" name="class" />
          <FormInput label="Section" name="section" />
        </div>
      </Modal>
    </MainLayout>
  );
};

export default Students;