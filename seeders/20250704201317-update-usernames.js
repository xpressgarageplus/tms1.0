'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      UPDATE "Users" SET username = 'admin1' WHERE email = 'admin@example.com';
      UPDATE "Users" SET username = 'driver1' WHERE email = 'driver@example.com';
      UPDATE "Users" SET username = 'dispatcher1' WHERE email = 'dispatch@example.com';
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      UPDATE "Users" SET username = NULL WHERE email IN (
        'admin@example.com', 'driver@example.com', 'dispatch@example.com'
      );
    `);
  }
};
