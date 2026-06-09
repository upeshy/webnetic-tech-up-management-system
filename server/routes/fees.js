const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRole } = require('../middleware/auth');

const {
  getFees,
  payFees,
  createFees
} = require('../controllers/feesController');

// ================= ROUTES =================

router.get('/', verifyToken, getFees);

router.post('/', verifyToken, authorizeRole('admin'), createFees);

router.post('/payment', verifyToken, payFees);

module.exports = router;
