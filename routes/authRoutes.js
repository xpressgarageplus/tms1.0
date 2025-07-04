const express = require('express');
const router = express.Router();
const path = require('path');
const authenticate = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const { User } = require('../models');

// Auth API routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

// GET current user info
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role']
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve reset-password form (e.g., from email link)
router.get('/reset-password', (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).send('Missing token');

  res.sendFile(path.join(__dirname, '../frontend/reset.html'));
});

module.exports = router;
