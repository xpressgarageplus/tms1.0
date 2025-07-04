const roleMiddleware = require('../middleware/roleMiddleware');
// routes/userRoutes.js or any other route file
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

// Only 'admin' can get all users
router.get('/all', auth, allowRoles('admin'), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// 'admin' and 'dispatcher' can create loads
router.post('/loads', auth, allowRoles('admin', 'dispatcher'), createLoad);

module.exports = router;
