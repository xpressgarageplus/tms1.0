const roleMiddleware = require('../middleware/roleMiddleware');
const authenticate = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const {
  createHistory,
  getHistoryByLoadId
} = require('../controllers/deliveryHistoryController');

// Protect all routes with authentication
router.use(authenticate);

// Only admin and dispatcher can create delivery history entries
router.post('/', roleMiddleware('admin', 'dispatcher'), createHistory);

// All authenticated roles (admin, dispatcher, driver) can view history
router.get('/:loadId', getHistoryByLoadId);

module.exports = router;
