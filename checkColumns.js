const sequelize = require('./config/database');

async function checkDocumentColumns() {
  const [results] = await sequelize.query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'Documents';
  `);
  console.log("📄 Columns in Documents table:");
  results.forEach(col => console.log(col.column_name));
  await sequelize.close();
}

checkDocumentColumns();
