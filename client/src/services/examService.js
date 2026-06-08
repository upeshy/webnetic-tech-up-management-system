/**
 * Exam Service
 * Handles exam API calls
 */

import api from './api';

const examService = {
  getExams: async (params = {}) => {
    const response = await api.get('/exams', { params });
    return response.data;
  },

  getResults: async (params = {}) => {
    const response = await api.get('/exams/results', { params });
    return response.data;
  },

  createExam: async (data) => {
    const response = await api.post('/exams', data);
    return response.data;
  },

  addMarks: async (data) => {
    const response = await api.post('/exams/marks', data);
    return response.data;
  }
};

export default examService;
