module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define('Truck', {
    plateNumber: DataTypes.STRING,
    model: DataTypes.STRING,
    driverId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Drivers',
        key: 'id',
      },
    },
  });

  Truck.associate = models => {
    Truck.hasMany(models.Load, { foreignKey: 'truckId' });
    Truck.belongsTo(models.Driver, { foreignKey: 'driverId' });
  };

  return Truck;
};
