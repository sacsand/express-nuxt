const { db, Sequelize } = require("../config/db.config");

const User = db.define("user", {
  fullname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});
module.exports = User;
