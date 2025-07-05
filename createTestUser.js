const bcrypt = require('bcrypt');
const { User } = require('./models'); // adjust if in subfolder
const sequelize = require('./config/database'); // adjust path as needed

(async () => {
  try {
    await sequelize.authenticate();
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const user = await User.create({
      name: 'Admin',
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ User created:', user.username);
    process.exit();
  } catch (err) {
    console.error('❌ Error creating user:', err);
    process.exit(1);
  }
})();
