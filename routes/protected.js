const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

router.get('/admin-only', authMiddleware, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

router.get('/driver-only', authMiddleware, requireRole('driver'), (req, res) => {
  res.json({ message: 'Welcome Driver' });
});

router.get('/any-authenticated-user', authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}` });
});

module.exports = router;
