'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Documents', 'mimetype', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Documents', 'size', {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Documents', 'mimetype');
    await queryInterface.removeColumn('Documents', 'size');
  }
};
