const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const { getAdminDashboard, getStudentDashboard, getTeacherDashboard, getStatistics } = require('../controllers/dashboardController');

const router = express.Router();

// All dashboard routes require authentication
router.use(verifyToken);

// Admin dashboard
router.get('/admin', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, getAdminDashboard);

// Student dashboard
router.get('/student', (req, res, next) => {
  authorizeRole('student')(req, res, next);
}, getStudentDashboard);

// Teacher dashboard
router.get('/teacher', (req, res, next) => {
  authorizeRole('teacher')(req, res, next);
}, getTeacherDashboard);

// System statistics (admin only)
router.get('/statistics', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, getStatistics);

module.exports = router;
