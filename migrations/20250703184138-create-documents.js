// Example: migrations/[timestamp]-create-documents.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Documents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      filename: Sequelize.STRING,
      path: Sequelize.STRING,
      type: Sequelize.STRING,
      relatedId: Sequelize.INTEGER,
      relatedType: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Documents');
  }
};
