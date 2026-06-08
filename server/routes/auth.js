/**
 * Authentication Routes
 * Handles user registration, login, and profile endpoints
 */

const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Routes
router.get('/me', protect, getMe);

// Health check
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working' });
});

module.exports = router;
