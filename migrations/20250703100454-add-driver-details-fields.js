'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Drivers');

    if (!table.email) {
      await queryInterface.addColumn('Drivers', 'email', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.phone) {
      await queryInterface.addColumn('Drivers', 'phone', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.address) {
      await queryInterface.addColumn('Drivers', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.licenseExpiry) {
      await queryInterface.addColumn('Drivers', 'licenseExpiry', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Drivers', 'email');
    await queryInterface.removeColumn('Drivers', 'phone');
    await queryInterface.removeColumn('Drivers', 'address');
    await queryInterface.removeColumn('Drivers', 'licenseExpiry');
  }
};
