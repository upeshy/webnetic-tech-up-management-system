const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const { getAttendance, getAttendanceById, createAttendance, createBulkAttendance, updateAttendance, getAttendanceSummary, deleteAttendance } = require('../controllers/attendanceController');

const router = express.Router();

// All attendance routes require authentication
router.use(verifyToken);

// Get attendance records
router.get('/', getAttendance);

// Get attendance by ID
router.get('/:id', getAttendanceById);

// Get attendance summary for student
router.get('/summary/:studentId', getAttendanceSummary);

// Create attendance (teacher, admin)
router.post('/', (req, res, next) => {
  authorizeRole('admin', 'teacher')(req, res, next);
}, createAttendance);

// Bulk create attendance (teacher, admin)
router.post('/bulk', (req, res, next) => {
  authorizeRole('admin', 'teacher')(req, res, next);
}, createBulkAttendance);

// Update attendance (teacher, admin)
router.put('/:id', (req, res, next) => {
  authorizeRole('admin', 'teacher')(req, res, next);
}, updateAttendance);

// Delete attendance (admin only)
router.delete('/:id', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, deleteAttendance);

module.exports = router;
