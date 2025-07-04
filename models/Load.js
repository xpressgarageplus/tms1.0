module.exports = (sequelize, DataTypes) => {
  const Load = sequelize.define('Load', {
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    driverId: DataTypes.INTEGER,
    truckId: DataTypes.INTEGER,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  });

  Load.associate = models => {
    Load.belongsTo(models.Driver, { foreignKey: 'driverId' });
    Load.belongsTo(models.Truck, { foreignKey: 'truckId' });
    Load.hasMany(models.DeliveryHistory, { foreignKey: 'loadId' });
  };

  return Load;
};
