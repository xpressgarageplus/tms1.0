const DeliveryHistory = require('../models/DeliveryHistory');
const Load = require('../models/Load');

exports.createHistory = async (req, res, next) => {
  try {
    const { status, notes, loadId } = req.body;

    // Make sure the load exists
    const load = await Load.findByPk(loadId);
    if (!load) {
      return res.status(404).json({ message: 'Load not found' });
    }

    const history = await DeliveryHistory.create({
      status,
      notes,
      loadId
    });

    res.status(201).json(history);
  } catch (err) {
    next(err);
  }
};

exports.getHistoryByLoadId = async (req, res, next) => {
  try {
    const { loadId } = req.params;

    const history = await DeliveryHistory.findAll({
      where: { loadId },
      order: [['timestamp', 'DESC']]
    });

    res.json(history);
  } catch (err) {
    next(err);
  }
};
