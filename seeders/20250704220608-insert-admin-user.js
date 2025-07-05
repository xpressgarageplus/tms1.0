'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin User', // ✅ Add this line
      username: 'admin',
      email: 'placeholder@example.com',
      password: '$2b$10$Vl.46W/Xd4XAvvSULVXyH.wmnufokD37H5eUTWJxM80WkuiY4MyR6', // hashed password
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { username: 'admin' });
  }
};
