const Sequelize = require("sequelize");

const db = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`);

module.exports = { db: db, Sequelize: Sequelize };
