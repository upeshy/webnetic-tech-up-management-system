const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  getFees,
  payFees,
  createFees
} = require('../controllers/feesController');

// Routes
router.get('/', protect, getFees);
router.post('/', protect, authorize('admin'), createFees);
router.post('/payment', protect, payFees);

module.exports = router;
