const bcrypt = require('bcrypt');
const { User } = require('./models');

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = await User.create({
      name: "Admin2",
      username: "admin2",
      email: "admin2@example.com",
      password: hashedPassword,
      role: "admin"
    });
    console.log("✅ User created:", user.username);
  } catch (err) {
    console.error("❌ Error creating user:", err);
  }
}

createUser();
