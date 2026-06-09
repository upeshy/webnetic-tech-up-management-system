const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRole } = require('../middleware/auth');

const {
  getExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
  getUpcomingExams
} = require('../controllers/examController');

// ================= ROUTES =================

// Get all exams
router.get('/', verifyToken, getExams);

// Get single exam
router.get('/:id', verifyToken, getExam);

// Upcoming exams
router.get('/upcoming', verifyToken, getUpcomingExams);

// Create exam
router.post('/', verifyToken, authorizeRole('admin', 'teacher'), createExam);

// Update exam
router.put('/:id', verifyToken, authorizeRole('admin', 'teacher'), updateExam);

// Delete exam
router.delete('/:id', verifyToken, authorizeRole('admin'), deleteExam);

module.exports = router;
