const { Op } = require('sequelize');
const { Driver, Load, Payroll } = require('../models');

const calculatePayroll = async (driverId, periodStart, periodEnd) => {
  const driver = await Driver.findByPk(driverId);
  if (!driver) throw new Error('Driver not found');

  let amount = 0;

  switch (driver.payType) {
    case 'per_load':
      const completedLoads = await Load.count({
        where: {
          driverId,
          status: 'delivered',
          updatedAt: { 
            [Op.between]: [periodStart, periodEnd]
          }
        }
      });
      amount = completedLoads * driver.payRate;
      break;

    case 'per_mile':
      const totalMiles = await getMilesDriven(driverId, periodStart, periodEnd);
      amount = totalMiles * driver.payRate;
      break;

    case 'hourly':
      const totalHours = await getHoursWorked(driverId, periodStart, periodEnd);
      amount = totalHours * driver.payRate;
      break;

    case 'salary':
      amount = driver.payRate;
      break;
  }

  const payroll = await Payroll.create({
    driverId,
    amount,
    periodStart,
    periodEnd,
    status: 'unpaid'
  });

  return payroll;
};

// Placeholder functions
const getMilesDriven = async (driverId, start, end) => {
  return 0;
};

const getHoursWorked = async (driverId, start, end) => {
  return 0;
};

module.exports = { calculatePayroll };
