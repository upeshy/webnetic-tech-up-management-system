/**
 * Axios API Configuration
 * Handles all HTTP requests with JWT authentication
 */

import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('token');

    console.log("REQUEST TOKEN:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(

  (response) => response,

  (error) => {

    console.log(
      "API ERROR STATUS:",
      error.response?.status
    );

    console.log(
      "API ERROR DATA:",
      error.response?.data
    );

    // TEMP: auto redirect disabled
    // if (error.response?.status === 401) {
    //   localStorage.removeItem('token');
    //   window.location.href = '/login';
    // }

    return Promise.reject(error);
  }
);

export default api;
