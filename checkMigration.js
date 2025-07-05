const sequelize = require('./config/database');

async function checkMigration() {
  try {
    const [results] = await sequelize.query(`
      SELECT * FROM "SequelizeMeta"
      WHERE name = '20250704065111-update-documents-model.js';
    `);

    if (results.length > 0) {
      console.log('✅ Migration already marked in SequelizeMeta.');
    } else {
      console.log('❌ Migration is NOT marked.');
    }

    process.exit();
  } catch (error) {
    console.error('Error checking migration:', error.message);
    process.exit(1);
  }
}

checkMigration();
