const express = require('express');
const router = express.Router();

const { verifyToken: protect } = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

router.get('/admin', protect, dashboardController.getAdminDashboard);
router.get('/student', protect, dashboardController.getStudentDashboard);
router.get('/teacher', protect, dashboardController.getTeacherDashboard);
router.get('/stats', protect, dashboardController.getStatistics);

module.exports = router;
