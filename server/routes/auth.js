/**

* Authentication Routes
* Handles user registration, login, and profile endpoints
  */

const express = require('express');
const router = express.Router();

const {
register,
login,
getProfile,
changePassword
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

// =========================
// Public Routes
// =========================

// Register User
router.post('/register', register);

// Login User
router.post('/login', login);

// Health Check
router.get('/test', (req, res) => {
res.status(200).json({
success: true,
message: 'Auth routes working successfully'
});
});

// =========================
// Protected Routes
// =========================

// Get Logged In User Profile
router.get('/me', protect, getProfile);

// Change Password
router.put('/change-password', protect, changePassword);

module.exports = router;
