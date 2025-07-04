'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Drivers', 'vehicleMake', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Drivers', 'vehicleModel', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Drivers', 'vehicleYear', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Drivers', 'licensePlate', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Drivers', 'registrationExpiry', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Drivers', 'vehicleMake');
    await queryInterface.removeColumn('Drivers', 'vehicleModel');
    await queryInterface.removeColumn('Drivers', 'vehicleYear');
    await queryInterface.removeColumn('Drivers', 'licensePlate');
    await queryInterface.removeColumn('Drivers', 'registrationExpiry');
  }
};
