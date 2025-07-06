require('dotenv').config();
const { parse } = require('pg-connection-string');

const parsed = parse(process.env.DATABASE_URL);

const sslConfig = {
  require: true,
  rejectUnauthorized: false, // allow self-signed certs (safe for Render's DB)
};

module.exports = {
  development: {
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    host: parsed.host,
    port: parsed.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: sslConfig
    }
  },
  production: {
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    host: parsed.host,
    port: parsed.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: sslConfig
    }
  }
};
