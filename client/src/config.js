/**
 * Application Configuration
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Smart School ERP';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Roles
export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent'
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me'
  },
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  ATTENDANCE: '/attendance',
  FEES: '/fees',
  EXAMS: '/exams',
  DASHBOARD: '/dashboard/stats'
};

// Default Credentials for Testing
export const DEFAULT_CREDENTIALS = {
  ADMIN: {
    email: 'admin@smartschool.com',
    password: 'admin@123'
  },
  TEACHER: {
    email: 'teacher@smartschool.com',
    password: 'teacher@123'
  },
  STUDENT: {
    email: 'student@smartschool.com',
    password: 'student@123'
  }
};
