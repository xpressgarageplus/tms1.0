module.exports = (sequelize, DataTypes) => {
  const Payroll = sequelize.define('Payroll', {
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Drivers', key: 'id' }
    },
    loadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Loads', key: 'id' }
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    periodStart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    periodEnd: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'unpaid'
    }
  });

  Payroll.associate = models => {
    Payroll.belongsTo(models.Driver, { foreignKey: 'driverId' });
    Payroll.belongsTo(models.Load, { foreignKey: 'loadId' });
  };

  return Payroll;
};
