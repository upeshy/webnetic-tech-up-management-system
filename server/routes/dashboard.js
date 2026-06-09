const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');

const {
  getAdminDashboard,
  getStudentDashboard,
  getTeacherDashboard,
  getStatistics
} = require('../controllers/dashboardController');

// ================= ROUTES =================

// System stats
router.get('/statistics', protect, getStatistics);

// Admin dashboard
router.get('/admin', protect, getAdminDashboard);

// Student dashboard
router.get('/student', protect, getStudentDashboard);

// Teacher dashboard
router.get('/teacher', protect, getTeacherDashboard);

module.exports = router;
