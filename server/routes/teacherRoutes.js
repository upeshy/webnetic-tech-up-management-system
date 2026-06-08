const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const { getAllTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/teacherController');

const router = express.Router();

// All teacher routes require authentication
router.use(verifyToken);

// Get all teachers
router.get('/', getAllTeachers);

// Get teacher by ID
router.get('/:id', getTeacher);

// Create teacher (admin only)
router.post('/', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, createTeacher);

// Update teacher (admin, teacher own profile)
router.put('/:id', (req, res, next) => {
  if (req.userRole === 'admin' || req.userId === req.params.id) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized' });
  }
}, updateTeacher);

// Delete teacher (admin only)
router.delete('/:id', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, deleteTeacher);

module.exports = router;
