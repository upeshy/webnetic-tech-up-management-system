const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const dashboardController = require('../controllers/dashboardController');

console.log("CONTROLLER LOADED OK");

const admin = dashboardController.getAdminDashboard;
const student = dashboardController.getStudentDashboard;
const teacher = dashboardController.getTeacherDashboard;
const stats = dashboardController.getStatistics;

// HARD VALIDATION (IMPORTANT)
if (typeof admin !== 'function') throw new Error("admin is not function");
if (typeof student !== 'function') throw new Error("student is not function");
if (typeof teacher !== 'function') throw new Error("teacher is not function");
if (typeof stats !== 'function') throw new Error("stats is not function");

router.get('/admin', protect, admin);
router.get('/student', protect, student);
router.get('/teacher', protect, teacher);
router.get('/stats', protect, stats);

module.exports = router;
