// routes/auth.js or similar
const express = require('express');
const jwt = require('jsonwebtoken');
const { RefreshToken, User } = require('../models');
const router = express.Router();

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'No token provided' });

  try {
    const stored = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!stored) return res.status(403).json({ error: 'Invalid refresh token' });

    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findByPk(payload.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    return res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Token invalid or expired' });
  }
});
