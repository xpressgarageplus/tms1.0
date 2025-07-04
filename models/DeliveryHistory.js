module.exports = (sequelize, DataTypes) => {
  const DeliveryHistory = sequelize.define('DeliveryHistory', {
    loadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Loads', key: 'id' }
    },
    status: DataTypes.STRING,
    timestamp: DataTypes.DATE
  });

  DeliveryHistory.associate = models => {
    DeliveryHistory.belongsTo(models.Load, { foreignKey: 'loadId' });
  };

  return DeliveryHistory;
};
