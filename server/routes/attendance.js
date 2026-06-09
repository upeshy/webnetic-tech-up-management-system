/**
 * Attendance Routes
 * Handles attendance marking and reports
 */

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAttendance,
  createAttendance,
  createBulkAttendance,
  updateAttendance
} = require('../controllers/attendanceController');

// Routes
router.get('/', protect, getAttendance);
router.post('/', protect, authorize('admin', 'teacher'), createAttendance);
router.post('/bulk', protect, authorize('admin', 'teacher'), createBulkAttendance);
router.put('/:id', protect, authorize('admin', 'teacher'), updateAttendance);

module.exports = router;
