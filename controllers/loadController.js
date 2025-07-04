const { Load, Driver, Truck } = require('../models');
const sendTelegramMessage = require('../utils/telegramNotifier'); // Adjust path as needed

// ✅ Create a new load
exports.createLoad = async (req, res, next) => {
  try {
    const load = await Load.create(req.body);

    // Notify dispatch via Telegram
    await sendTelegramMessage(`🚚 New load created:\nDestination: ${load.destination}\nWeight: ${load.weight || 'N/A'} lbs`);

    res.status(201).json(load);
  } catch (error) {
    next(error);
  }
};

// ✅ Get all active loads (filter out soft-deleted)
exports.getLoads = async (req, res, next) => {
  try {
    const includeAll = req.query.all === 'true'; // Use ?all=true to include soft-deleted
    const loads = await Load.findAll({
      where: includeAll ? {} : { isActive: true },
      include: [
        {
          model: Driver,
          attributes: ['id', 'name']
        },
        {
          model: Truck,
          attributes: ['id', 'make', 'model']
        }
      ]
    });
    res.json(loads);
  } catch (error) {
    next(error);
  }
};

// ✅ Get single load
exports.getLoadById = async (req, res, next) => {
  try {
    const load = await Load.findByPk(req.params.id, {
      include: [Driver, Truck]
    });
    if (!load) return res.status(404).json({ message: 'Load not found' });
    res.json(load);
  } catch (error) {
    next(error);
  }
};

// ✅ Update status
exports.updateLoadStatus = async (req, res, next) => {
  try {
    const load = await Load.findByPk(req.params.id);
    if (!load) return res.status(404).json({ message: 'Load not found' });

    load.status = req.body.status;
    await load.save();
    res.json(load);
  } catch (error) {
    next(error);
  }
};

// ✅ Assign to truck
exports.assignLoad = async (req, res, next) => {
  try {
    const load = await Load.findByPk(req.params.id);
    if (!load) return res.status(404).json({ message: 'Load not found' });

    const { truckId } = req.body;
    load.truckId = truckId;
    await load.save();

    res.json({ message: 'Load assigned successfully', load });
  } catch (error) {
    next(error);
  }
};

// ✅ Soft-delete
exports.deleteLoad = async (req, res) => {
  try {
    const load = await Load.findByPk(req.params.id);
    if (!load) {
      return res.status(404).json({ error: 'Load not found' });
    }

    await load.update({
      isActive: false,
      deletedAt: new Date()
    });

    res.json({ message: 'Load marked as inactive (soft deleted)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
