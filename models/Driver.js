module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    terminationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },

    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    licenseNumber: { type: DataTypes.STRING, allowNull: false },
    licenseExpiry: { type: DataTypes.DATE, allowNull: true },

    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,

    payType: {
      type: DataTypes.ENUM('per_load', 'per_mile', 'hourly', 'salary'),
      allowNull: false,
      defaultValue: 'per_load',
    },
    payRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    life360Id: { type: DataTypes.STRING, allowNull: true },
    lastKnownLat: { type: DataTypes.STRING, allowNull: true },
    lastKnownLng: { type: DataTypes.STRING, allowNull: true },
    locationUpdatedAt: { type: DataTypes.DATE, allowNull: true },

    vehicleMake: { type: DataTypes.STRING, allowNull: true },
    vehicleModel: { type: DataTypes.STRING, allowNull: true },
    vehicleYear: { type: DataTypes.INTEGER, allowNull: true },
    licensePlate: { type: DataTypes.STRING, allowNull: true },
    registrationExpiry: { type: DataTypes.DATE, allowNull: true }
  });

  Driver.associate = models => {
    Driver.hasMany(models.Truck, { foreignKey: 'driverId' });
    Driver.hasMany(models.Payroll, { foreignKey: 'driverId' });
  };

  return Driver;
};
