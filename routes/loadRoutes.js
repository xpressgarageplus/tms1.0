const express = require('express');
const router = express.Router();
const loadController = require('../controllers/loadController');
const authenticate = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const assignLoadToDriver = require('../services/assignLoadToDriver');

// 🔐 Create load — only admin and dispatcher
router.post('/', authenticate, roleMiddleware('admin', 'dispatcher'), loadController.createLoad);

// 👀 View all loads — any authenticated user
router.get('/', authenticate, loadController.getLoads);

// 👀 View single load by ID (optional)
router.get('/:id', authenticate, loadController.getLoadById);

// ✏️ Update load status — only admin or dispatcher
router.patch('/:id/status', authenticate, roleMiddleware('admin', 'dispatcher'), loadController.updateLoadStatus);

// 🚛 Assign load to truck — only admin or dispatcher
router.put('/:id/assign', authenticate, roleMiddleware('admin', 'dispatcher'), loadController.assignLoad);

// 🧹 Delete load — only admin
router.delete('/:id', authenticate, roleMiddleware('admin'), loadController.deleteLoad);

// ✅ New: Assign load and send ETA via Telegram
router.post('/assign', authenticate, roleMiddleware('admin', 'dispatcher'), async (req, res) => {
  const { driverId, loadId } = req.body;

  try {
    const updatedLoad = await assignLoadToDriver(driverId, loadId);
    res.json({ message: 'Load assigned and ETA sent', load: updatedLoad });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
