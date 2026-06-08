const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

// All student routes require authentication
router.use(verifyToken);

// Get all students (admin, teacher can view)
router.get('/', (req, res, next) => {
  authorizeRole('admin', 'teacher')(req, res, next);
}, getAllStudents);

// Get student by ID
router.get('/:id', getStudent);

// Create student (admin only)
router.post('/', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, createStudent);

// Update student (admin, student own profile)
router.put('/:id', (req, res, next) => {
  if (req.userRole === 'admin' || req.userId === req.params.id) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized' });
  }
}, updateStudent);

// Delete student (admin only)
router.delete('/:id', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, deleteStudent);

module.exports = router;
