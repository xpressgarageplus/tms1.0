const { Driver } = require('../models');

// Create a new driver
exports.createDriver = async (req, res) => {
  try {
    const driver = await Driver.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      licenseNumber: req.body.licenseNumber,
      licenseExpiry: req.body.licenseExpiry,
      payType: req.body.payType,
      payRate: req.body.payRate,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vehicleYear: req.body.vehicleYear,
      licensePlate: req.body.licensePlate,
      registrationExpiry: req.body.registrationExpiry
    });

    res.status(201).json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all drivers (optionally include inactive)
exports.getDrivers = async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { isActive: true };
    const drivers = await Driver.findAll({ where: query });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'phone',
        'email',
        'address',
        'licenseNumber',
        'licenseExpiry',
        'payType',
        'payRate',
        'lastKnownLat',
        'lastKnownLng',
        'assignedDestination',
        'vehicleMake',
        'vehicleModel',
        'vehicleYear',
        'licensePlate',
        'registrationExpiry'
      ]
    });

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    await driver.update({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      licenseNumber: req.body.licenseNumber,
      licenseExpiry: req.body.licenseExpiry,
      payType: req.body.payType,
      payRate: req.body.payRate,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vehicleYear: req.body.vehicleYear,
      licensePlate: req.body.licensePlate,
      registrationExpiry: req.body.registrationExpiry
    });

    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft-delete driver
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    await driver.update({
      isActive: false,
      terminationDate: new Date()
    });

    res.json({ message: 'Driver marked as inactive (soft deleted)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
