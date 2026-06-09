/**
 * Teacher Routes
 * Handles all teacher management endpoints
 */

const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRole } = require('../middleware/auth');

const {
  getAllTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teacherController');
// ================= ROUTES =================

// Get all teachers
router.get('/', verifyToken, getAllTeachers);

// Get teacher by ID
router.get('/:id', verifyToken, getTeacher);

// Create teacher (admin only)
router.post('/', verifyToken, authorizeRole('admin'), createTeacher);

// Update teacher (admin only)
router.put('/:id', verifyToken, authorizeRole('admin'), updateTeacher);

// Delete teacher (admin only)
router.delete('/:id', verifyToken, authorizeRole('admin'), deleteTeacher);

module.exports = router;
