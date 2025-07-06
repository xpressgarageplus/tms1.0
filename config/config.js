require('dotenv').config();
const { parse } = require('pg-connection-string');

const parsed = parse(process.env.DATABASE_URL);

module.exports = {
  development: {
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    host: parsed.host,
    port: parsed.port,
    dialect: 'postgres',
  },
  production: {
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    host: parsed.host,
    port: parsed.port,
    dialect: 'postgres',
  }
};
