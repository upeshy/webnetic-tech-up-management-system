/**
 * Teacher Routes
 * Handles all teacher management endpoints
 */

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { 
  getAllTeachers, 
  getTeacherById, 
  createTeacher, 
  updateTeacher, 
  deleteTeacher 
} = require('../controllers/teacherController');

// Routes
router.get('/', protect, getAllTeachers);
router.get('/:id', protect, getTeacherById);
router.post('/', protect, authorize('admin'), createTeacher);
router.put('/:id', protect, authorize('admin'), updateTeacher);
router.delete('/:id', protect, authorize('admin'), deleteTeacher);

module.exports = router;