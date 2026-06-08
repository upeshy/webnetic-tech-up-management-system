const express = require('express');

const router = express.Router();

// Simple Test Route
router.get('/test', (req, res) => {
res.json({
success: true,
message: 'Auth Route Working Successfully'
});
});

module.exports = router;
