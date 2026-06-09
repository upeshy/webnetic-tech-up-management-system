const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const dashboardController = require('../controllers/dashboardController');

if (!dashboardController) {
  console.log("❌ dashboardController NOT FOUND");
}

console.log("LOADED KEYS:", Object.keys(dashboardController));

router.get('/admin', protect, dashboardController.getAdminDashboard);
router.get('/student', protect, dashboardController.getStudentDashboard);
router.get('/teacher', protect, dashboardController.getTeacherDashboard);
router.get('/stats', protect, dashboardController.getStatistics);

module.exports = router;
