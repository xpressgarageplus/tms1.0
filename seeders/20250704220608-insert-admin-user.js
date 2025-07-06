'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if user already exists
    const [users] = await queryInterface.sequelize.query(
      `SELECT * FROM "Users" WHERE username = 'admin' LIMIT 1;`
    );

    if (users.length === 0) {
      await queryInterface.bulkInsert('Users', [{
        name: 'Admin User',
        username: 'admin',
        email: 'placeholder@example.com',
        password: '$2b$10$Vl.46W/Xd4XAvvSULVXyH.wmnufokD37H5eUTWJxM80WkuiY4MyR6', // hashed: admin123
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    } else {
      console.log('⚠️ Admin user already exists. Skipping insert.');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { username: 'admin' });
  }
};
