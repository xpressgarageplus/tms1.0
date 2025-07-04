const roleMiddleware = require('../middleware/roleMiddleware');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const truckController = require('../controllers/truckController');

// Apply authentication globally
router.use(authenticate);

// Only 'admin' and 'dispatcher' can create/update trucks
router.post('/', roleMiddleware('admin', 'dispatcher'), truckController.createTruck);
router.put('/:id', roleMiddleware('admin', 'dispatcher'), truckController.updateTruck);

// All authenticated users (including drivers) can view trucks
router.get('/', truckController.getTrucks);

module.exports = router;
