'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payrolls', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Drivers',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      loadId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Loads',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      periodStart: {
        type: Sequelize.DATE,
        allowNull: false
      },
      periodEnd: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'unpaid'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payrolls');
  }
};
