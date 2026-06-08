const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const { getFees, getFeesById, createFees, payFees, getFeeSummary, updateFees, deleteFees } = require('../controllers/feesController');

const router = express.Router();

// All fees routes require authentication
router.use(verifyToken);

// Get all fees records
router.get('/', getFees);

// Get fees by ID
router.get('/:id', getFeesById);

// Get fee summary for student
router.get('/summary/:studentId', getFeeSummary);

// Create fees (admin only)
router.post('/', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, createFees);

// Record payment (admin, finance staff)
router.put('/:id/pay', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, payFees);

// Update fees (admin only)
router.put('/:id', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, updateFees);

// Delete fees (admin only)
router.delete('/:id', (req, res, next) => {
  authorizeRole('admin')(req, res, next);
}, deleteFees);

module.exports = router;
