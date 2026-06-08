/**
 * Dashboard Routes
 * Provides statistics and overview data
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/dashboardController');

// Routes
router.get('/stats', protect, getDashboardStats);

module.exports = router;