/**
 * Student Routes
 * Handles all student management endpoints
 */

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { 
  getAllStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} = require('../controllers/studentController');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/students/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Routes
router.get('/', protect, getAllStudents);
router.get('/:id', protect, getStudentById);
router.post('/', protect, authorize('admin'), upload.single('photo'), createStudent);
router.put('/:id', protect, authorize('admin'), upload.single('photo'), updateStudent);
router.delete('/:id', protect, authorize('admin'), deleteStudent);

module.exports = router;