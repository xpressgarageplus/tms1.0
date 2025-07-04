'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Drivers', 'life360Id', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Drivers', 'lastKnownLat', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Drivers', 'lastKnownLng', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Drivers', 'locationUpdatedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Drivers', 'life360Id');
    await queryInterface.removeColumn('Drivers', 'lastKnownLat');
    await queryInterface.removeColumn('Drivers', 'lastKnownLng');
    await queryInterface.removeColumn('Drivers', 'locationUpdatedAt');
  }
};
