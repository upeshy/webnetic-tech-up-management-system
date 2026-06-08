/**
 * Student Service
 * Handles student API calls
 */

import api from './api';

const studentService = {
  getAllStudents: async (params = {}) => {
    const response = await api.get('/students', { params });
    return response.data;
  },

  getStudentById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  createStudent: async (formData) => {
    const response = await api.post('/students', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateStudent: async (id, formData) => {
    const response = await api.put(`/students/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteStudent: async (id) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  }
};

export default studentService;
