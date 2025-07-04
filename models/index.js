// models/index.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 1. Load all models in this directory
fs.readdirSync(__dirname)
  .filter(file =>
    file !== basename &&
    file.endsWith('.js') &&
    !file.startsWith('.') &&
    file !== 'associations.js'
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// 2. Load associations after all models initialized
require('./associations')(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
