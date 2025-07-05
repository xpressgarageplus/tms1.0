const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

const { User } = require('../models'); // ✅ Import User model
const { createLoad } = require('../controllers/loadController'); // ✅ Update path if needed

// Only 'admin' can get all users
router.get('/all', auth, allowRoles('admin'), async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// 'admin' and 'dispatcher' can create loads
router.post('/loads', auth, allowRoles('admin', 'dispatcher'), createLoad);

module.exports = router;
