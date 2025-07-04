const { Driver, Truck } = require('../models');


exports.createTruck = async (req, res, next) => {
  try {
    const { plateNumber, model, capacity, driverId } = req.body;

    // Validate driver exists
    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return res.status(400).json({ error: 'Invalid driverId' });
    }

    const truck = await Truck.create({
      plateNumber,
      model,
      capacity,
      driverId,
    });

    res.status(201).json(truck);
  } catch (error) {
    next(error);
  }
};

exports.getTrucks = async (req, res, next) => {
  try {
    const trucks = await Truck.findAll({ include: Driver });
    res.json(trucks);
  } catch (error) {
    next(error);
  }
};

exports.getTruckById = async (req, res, next) => {
  try {
    const truck = await Truck.findByPk(req.params.id, { include: Driver });
    if (!truck) return res.status(404).json({ error: 'Truck not found' });
    res.json(truck);
  } catch (error) {
    next(error);
  }
};

exports.updateTruck = async (req, res, next) => {
  try {
    const truck = await Truck.findByPk(req.params.id);
    if (!truck) return res.status(404).json({ error: 'Truck not found' });

    await truck.update(req.body);
    res.json(truck);
  } catch (error) {
    next(error);
  }
};

exports.deleteTruck = async (req, res, next) => {
  try {
    const truck = await Truck.findByPk(req.params.id);
    if (!truck) return res.status(404).json({ error: 'Truck not found' });

    await truck.destroy();
    res.json({ message: 'Truck deleted' });
  } catch (error) {
    next(error);
  }
};
