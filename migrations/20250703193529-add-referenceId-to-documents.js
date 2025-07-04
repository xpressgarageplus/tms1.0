module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Documents', 'referenceId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Documents', 'referenceId');
  }
};
