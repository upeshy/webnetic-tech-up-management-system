const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRole } = require('../middleware/auth');

const {
  getAttendance,
  createAttendance,
  createBulkAttendance,
  updateAttendance,
  getAttendanceSummary,
  deleteAttendance
} = require('../controllers/attendanceController');

// Routes
router.get('/', verifyToken, getAttendance);

router.post('/', verifyToken, authorizeRole('admin', 'teacher'), createAttendance);

router.post('/bulk', verifyToken, authorizeRole('admin', 'teacher'), createBulkAttendance);

router.put('/:id', verifyToken, authorizeRole('admin', 'teacher'), updateAttendance);

router.get('/summary/:studentId', verifyToken, getAttendanceSummary);

router.delete('/:id', verifyToken, authorizeRole('admin', 'teacher'), deleteAttendance);

module.exports = router;
