const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// ✅ Protected route
router.get('/secure-data', verifyToken, (req, res) => {
  res.json({ message: 'This is protected data for authenticated users only.' });
});

module.exports = router;
