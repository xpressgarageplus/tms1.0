// routes/maps.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/route', async (req, res) => {
  const { origin, destination } = req.body;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    const data = response.data;
    if (data.status !== 'OK') {
      return res.status(400).json({ error: data.error_message || 'Route not found' });
    }

    const route = data.routes[0].legs[0];

    res.json({
      distance: route.distance.text,
      duration: route.duration.text,
      startAddress: route.start_address,
      endAddress: route.end_address
    });
  } catch (err)
