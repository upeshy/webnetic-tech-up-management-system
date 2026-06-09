const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const dashboardController = require('../controllers/dashboardController');

console.log("CONTROLLER:", dashboardController);

const admin = dashboardController.getAdminDashboard;
const student = dashboardController.getStudentDashboard;
const teacher = dashboardController.getTeacherDashboard;
const stats = dashboardController.getStatistics;

// HARD CHECK (IMPORTANT)
if (!admin || !student || !teacher || !stats) {
  throw new Error("❌ One or more dashboard functions are undefined");
}

router.get('/admin', protect, admin);
router.get('/student', protect, student);
router.get('/teacher', protect, teacher);
router.get('/stats', protect, stats);

module.exports = router;
