const sequelize = require('./config/database');

async function checkMigrations() {
  try {
    const [results] = await sequelize.query(`SELECT * FROM "SequelizeMeta";`);
    console.log("✅ Applied Migrations:");
    results.forEach(row => console.log(row.name));
  } catch (err) {
    console.error("❌ Failed to check migrations:", err);
  } finally {
    await sequelize.close();
  }
}

checkMigrations();
