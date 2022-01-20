const Sequelize = require("sequelize");

const db = new Sequelize("postgres://root:root@pg_container:5432/test_db");

module.exports = { db: db, Sequelize: Sequelize };
