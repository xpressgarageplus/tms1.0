'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      licenseNumber: Sequelize.STRING,
      licenseExpiry: Sequelize.DATE,
      address: Sequelize.STRING,
      payPerMile: Sequelize.FLOAT,
      payPerHour: Sequelize.FLOAT,
      payPerLoad: Sequelize.FLOAT,
      fixedSalary: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Drivers');
  }
};
