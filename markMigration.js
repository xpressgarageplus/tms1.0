const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

async function markMigration() {
  try {
    await sequelize.getQueryInterface().bulkInsert('SequelizeMeta', [
      { name: '20250704065111-update-documents-model.js' }
    ]);
    console.log('✅ Migration manually marked as run');
  } catch (err) {
    console.error('❌ Failed to mark migration:', err.message);
  } finally {
    process.exit();
  }
}

markMigration();
