'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Drivers', 'email', Sequelize.STRING);
    await queryInterface.addColumn('Drivers', 'address', Sequelize.STRING);
    await queryInterface.addColumn('Drivers', 'licenseExpiry', Sequelize.DATE);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Drivers', 'email');
    await queryInterface.removeColumn('Drivers', 'address');
    await queryInterface.removeColumn('Drivers', 'licenseExpiry');
  }
};
