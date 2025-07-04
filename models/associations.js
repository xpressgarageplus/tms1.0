module.exports = (db) => {
  const { Driver, Truck, Load, DeliveryHistory, Payroll } = db;

  if (!Driver || !Truck || !Load || !DeliveryHistory || !Payroll) {
    console.error('Missing models in associations.js');
    return;
  }

  Driver.hasMany(Truck, { foreignKey: 'driverId' });
  Truck.belongsTo(Driver, { foreignKey: 'driverId' });

  Truck.hasMany(Load, { foreignKey: 'truckId' });
  Load.belongsTo(Truck, { foreignKey: 'truckId' });

  Driver.hasMany(Payroll, { foreignKey: 'driverId' });
  Payroll.belongsTo(Driver, { foreignKey: 'driverId' });

  Load.hasMany(DeliveryHistory, { foreignKey: 'loadId' });
  DeliveryHistory.belongsTo(Load, { foreignKey: 'loadId' });

  Load.belongsTo(Driver, { foreignKey: 'driverId' });
};
