const { User, RefreshToken, PasswordResetToken } = require('../models');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendResetEmail = require('../utils/sendEmail');

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, role = 'user', username } = req.body;

    const existingUser = await User.findOne({
      where: { [User.sequelize.Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, name, email, username, role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const accessToken = jwt.sign(
  {
    id: user.id,
    role: user.role,
    username: user.username
  },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: '15m' }
);

const refreshToken = jwt.sign(
  {
    id: user.id
  },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: '7d' }
);

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REFRESH TOKEN
const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Refresh token required' });

  const storedToken = await RefreshToken.findOne({ where: { token } });
  if (!storedToken || storedToken.expiryDate < new Date()) {
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

// REQUEST PASSWORD RESET
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await PasswordResetToken.create({
      token,
      userId: user.id,
      expiryDate: expiry,
    });

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    await sendResetEmail(user.email, resetLink);

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const storedToken = await PasswordResetToken.findOne({ where: { token } });
    if (!storedToken || storedToken.expiryDate < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const user = await User.findByPk(storedToken.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await storedToken.destroy();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Final export block
module.exports = {
  register,
  login,
  refreshToken,
  requestPasswordReset,
  resetPassword,
};
