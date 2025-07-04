// routes/checklistProgressRoutes.js
const express = require('express');
const router = express.Router();
const { ChecklistProgress } = require('../models'); // Adjust if needed

// GET checklist progress for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const record = await ChecklistProgress.findOne({ where: { userId } });
    res.json(record || { progress: {} });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST or update checklist progress
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { progress } = req.body;
    await ChecklistProgress.upsert({ userId, progress });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
