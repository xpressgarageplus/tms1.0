const { Payroll, Driver } = require('../models');

exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.findAll({ include: [Driver] });
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payroll history' });
  }
};

exports.getPayrollByDriverId = async (req, res) => {
  const { driverId } = req.params;

  // If the user is not an admin or dispatcher, ensure they’re requesting their own data
  if (req.user.role === 'driver' && req.user.id !== parseInt(driverId)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const payrolls = await Payroll.findAll({
      where: { driverId },
      include: [Driver]
    });
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching driver payroll' });
  }
};
