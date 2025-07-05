'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users');

    if (!table.email) {
      await queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'placeholder@example.com' // fallback for existing rows
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'email');
  }
};
