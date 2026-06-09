/**
 * Student Routes
 * Handles all student management endpoints
 */

const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRole } = require('../middleware/auth');

const {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload folder exists
const uploadPath = 'uploads/students';

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG/PNG allowed.'));
    }
  }
});

// ================= ROUTES =================

// Get all students
router.get('/', verifyToken, getAllStudents);

// Get single student
router.get('/:id', verifyToken, getStudent);

// Create student (admin only)
router.post(
  '/',
  verifyToken,
  authorizeRole('admin'),
  upload.single('photo'),
  createStudent
);

// Update student (admin only)
router.put(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  upload.single('photo'),
  updateStudent
);

// Delete student (admin only)
router.delete(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  deleteStudent
);

module.exports = router;
