const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const dashboardController = require('../controllers/dashboardController');

/* 🔥 DEBUG (safe - import check) */
console.log("DASHBOARD CONTROLLER:", dashboardController);

// Optional extra debug (safe)
console.log("ADMIN FN:", typeof dashboardController.getAdminDashboard);
console.log("STUDENT FN:", typeof dashboardController.getStudentDashboard);
console.log("TEACHER FN:", typeof dashboardController.getTeacherDashboard);
console.log("STATS FN:", typeof dashboardController.getStatistics);

/* =======================
   ROUTES
======================= */

// Admin dashboard
router.get('/admin', protect, dashboardController.getAdminDashboard);

// Student dashboard
router.get('/student', protect, dashboardController.getStudentDashboard);

// Teacher dashboard
router.get('/teacher', protect, dashboardController.getTeacherDashboard);

// System stats
router.get('/stats', protect, dashboardController.getStatistics);

module.exports = router;
