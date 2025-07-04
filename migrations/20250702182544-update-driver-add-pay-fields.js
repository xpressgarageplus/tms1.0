'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Drivers', 'payType', {
      type: Sequelize.ENUM('per_load', 'per_mile', 'hourly', 'salary'),
      allowNull: false,
      defaultValue: 'per_load',
    });

    await queryInterface.addColumn('Drivers', 'payRate', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Drivers', 'payType');
    await queryInterface.removeColumn('Drivers', 'payRate');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Drivers_payType";');
  }
};
