const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const driverController = require('../controllers/driverController');
const { Driver } = require('../models');

// Protect all routes with authentication
router.use(authenticate);

// Update driver
router.put('/:id', roleMiddleware('admin', 'dispatcher'), driverController.updateDriver);

// Delete driver (admin only)
router.delete('/:id', roleMiddleware('admin'), driverController.deleteDriver);

// Location endpoint for map tracking
router.get('/locations', async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      attributes: ['name', 'lastKnownLat', 'lastKnownLng', 'assignedDestination']
    });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch driver locations' });
  }
});

// Create driver (admin or dispatcher only)
router.post('/', roleMiddleware('admin', 'dispatcher'), driverController.createDriver);

// Get all drivers
router.get('/', roleMiddleware('admin', 'dispatcher'), driverController.getDrivers);

// Get driver by ID
router.get('/:id', driverController.getDriverById);

module.exports = router;
