const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./authRoutes');
const driverRoutes = require('./driverRoutes');
const loadRoutes = require('./loadRoutes');
const datRoutes = require('./datRoutes'); // External DAT loads
const mapsRoutes = require('./mapsRoutes'); // Google Maps / ETA
const documentRoutes = require('./documentRoutes'); // File uploads

// Mount API subroutes (no duplicates!)
router.use('/auth', authRoutes);              // /api/auth
router.use('/drivers', driverRoutes);         // /api/drivers
router.use('/loads', loadRoutes);             // /api/loads
router.use('/external-loads', datRoutes);     // /api/external-loads
router.use('/maps', mapsRoutes);              // /api/maps
router.use('/documents', documentRoutes);     // /api/documents

module.exports = router;
