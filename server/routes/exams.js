const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

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
router.get('/', protect, getExams);

// Get single exam
router.get('/:id', protect, getExam);

// Get upcoming exams
router.get('/upcoming', protect, getUpcomingExams);

// Create exam
router.post('/', protect, authorize('admin', 'teacher'), createExam);

// Update exam
router.put('/:id', protect, authorize('admin', 'teacher'), updateExam);

// Delete exam
router.delete('/:id', protect, authorize('admin'), deleteExam);

module.exports = router;
