'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Documents', 'category', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Documents', 'folder', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Documents', 'tags', {
      type: Sequelize.STRING, // Use ARRAY(Sequelize.STRING) if using PostgreSQL
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Documents', 'category');
    await queryInterface.removeColumn('Documents', 'folder');
    await queryInterface.removeColumn('Documents', 'tags');
  }
};
