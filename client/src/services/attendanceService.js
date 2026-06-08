/**
 * Attendance Service
 * Handles attendance API calls
 */

import api from './api';

const attendanceService = {
  getAttendance: async (params = {}) => {
    const response = await api.get('/attendance', { params });
    return response.data;
  },

  markAttendance: async (data) => {
    const response = await api.post('/attendance', data);
    return response.data;
  },

  markBulkAttendance: async (data) => {
    const response = await api.post('/attendance/bulk', data);
    return response.data;
  },

  updateAttendance: async (id, data) => {
    const response = await api.put(`/attendance/${id}`, data);
    return response.data;
  }
};

export default attendanceService;
