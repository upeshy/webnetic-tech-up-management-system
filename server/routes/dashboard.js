const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  getAdminDashboard,
  getStudentDashboard,
  getTeacherDashboard,
  getStatistics
} = require('../controllers/dashboardController');

// Routes (FIXED)
router.get('/admin', protect, getAdminDashboard);
router.get('/student', protect, getStudentDashboard);
router.get('/teacher', protect, getTeacherDashboard);
router.get('/stats', protect, getStatistics);

module.exports = router;
