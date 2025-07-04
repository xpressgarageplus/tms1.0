const express = require('express');
const router = express.Router();
const { getETA } = require('../utils/googleMaps');
const { Driver } = require('../models');

// GET /api/maps/live-eta?driverId=123&destination=Chicago,IL
router.get('/live-eta', async (req, res) => {
  const { driverId, destination } = req.query;

  if (!driverId || !destination) {
    return res.status(400).json({ error: 'driverId and destination are required' });
  }

  const driver = await Driver.findByPk(driverId);

  if (!driver || !driver.lastKnownLat || !driver.lastKnownLng) {
    return res.status(404).json({ error: 'Driver or location not found' });
  }

  try {
    const origin = `${driver.lastKnownLat},${driver.lastKnownLng}`;
    const result = await getETA(origin, destination);
    res.json({
      driver: driver.name,
      origin,
      destination,
      eta: result.duration,
      distance: result.distance,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate ETA' });
  }
});

module.exports = router;
