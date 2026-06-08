const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const { register, login, getProfile, changePassword } = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', verifyToken, getProfile);
router.put('/change-password', verifyToken, changePassword);

module.exports = router;
