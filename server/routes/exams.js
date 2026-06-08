/**
 * Exam Routes
 * Handles exam and result management
 */

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getExams,
  createExam,
  addMarks,
  getResults
} = require('../controllers/examController');

// Routes
router.get('/', protect, getExams);
router.get('/results', protect, getResults);
router.post('/', protect, authorize('admin', 'teacher'), createExam);
router.post('/marks', protect, authorize('admin', 'teacher'), addMarks);

module.exports = router;