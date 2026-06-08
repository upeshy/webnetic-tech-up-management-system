/**
 * Fees Service
 * Handles fees API calls
 */

import api from './api';

const feesService = {
  getFees: async (params = {}) => {
    const response = await api.get('/fees', { params });
    return response.data;
  },

  createFee: async (data) => {
    const response = await api.post('/fees', data);
    return response.data;
  },

  recordPayment: async (data) => {
    const response = await api.post('/fees/payment', data);
    return response.data;
  }
};

export default feesService;
