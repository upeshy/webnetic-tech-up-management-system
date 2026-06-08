const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const { getExams, getExam, createExam, updateExam, deleteExam, getUpcomingExams } = require('../controllers/examController');

const router = express.Router();

// All exam routes require authentication
router.use(verifyToken);

// Get all exams
router.get('/', getExams);

// Get upcoming exams
router.get('/upcoming', getUpcomingExams);

// Get exam by ID
router.get('/:id', getExam);

// Create exam (teacher, admin)
router.post('/', (req, res, next) => {
  authorizeRole('admin', 'teacher')(req, res, next);
}, createExam);

// Update exam (teacher, admin)
router.put('/:id', (req, res, next) => {
  authorizeRole('admin', 'teacher')(req, res, next);
}, updateExam);

// Delete exam (admin only)
router.delete('/:id', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, deleteExam);

module.exports = router;
