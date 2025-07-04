module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Loads', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn('Loads', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Loads', 'isActive');
    await queryInterface.removeColumn('Loads', 'deletedAt');
  }
};
