'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users');

    if (!table.username) {
      await queryInterface.addColumn('Users', 'username', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'placeholder' // or something else, just required for existing rows
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'username');
  }
};
