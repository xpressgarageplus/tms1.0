
require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: "admin123",
    database: "tms",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "admin123",
    database: "tms",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "admin123",
    database: "tms",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres"
  }
};
