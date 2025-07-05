require('dotenv').config();

module.exports = {
  development: {
    username: tms_db_l468_user,
    password: NwXCj7Q67gTNq6Logcn7wwnwNvuoM737,
    database: tms_db_l468,
    host: dpg-d1jvisa4d50c738kfed0-a,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres"
  },
  test: {
    username: tms_db_l468_user,
    password: NwXCj7Q67gTNq6Logcn7wwnwNvuoM737,
    database: tms_db_l468,
    host: dpg-d1jvisa4d50c738kfed0-a,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres"
  },
  production: {
    username: tms_db_l468_user,
    password: NwXCj7Q67gTNq6Logcn7wwnwNvuoM737,
    database: tms_db_l468,
    host: dpg-d1jvisa4d50c738kfed0-a,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres"
  }
};
