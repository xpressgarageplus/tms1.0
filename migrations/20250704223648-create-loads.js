'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Loads', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      origin: Sequelize.STRING,
      destination: Sequelize.STRING,
      weight: Sequelize.FLOAT,
      status: Sequelize.STRING,
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Drivers',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Loads');
  }
};
