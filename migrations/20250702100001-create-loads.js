'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Loads', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      description: Sequelize.STRING,
      origin: Sequelize.STRING,
      destination: Sequelize.STRING,
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Loads');
  },
};
