const express = require('express');
const router = express.Router();
const datController = require('../controllers/datController');
const authenticate = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Require login for all DAT routes
router.use(authenticate);

// Only dispatchers and admins can search or post
router.get('/search', roleMiddleware('admin', 'dispatcher'), datController.searchExternalLoads);
router.post('/post', roleMiddleware('admin', 'dispatcher'), datController.postLoadToBoard);

module.exports = router;
