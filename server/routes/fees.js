/**
 * Fees Routes
 * Handles fees management and payment recording
 */

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getFees,
  recordPayment,
  createFee
} = require('../controllers/feesController');

// Routes
router.get('/', protect, getFees);
router.post('/', protect, authorize('admin'), createFee);
router.post('/payment', protect, recordPayment);

module.exports = router;