'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users');

    if (!table.username) {
      await queryInterface.addColumn('Users', 'username', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'placeholder' // temporary default to satisfy NOT NULL constraint
      });
    }

    if (!table.role) {
      await queryInterface.addColumn('Users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users');

    if (table.username) {
      await queryInterface.removeColumn('Users', 'username');
    }

    if (table.role) {
      await queryInterface.removeColumn('Users', 'role');
    }
  }
};
