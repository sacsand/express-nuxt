const { db, Sequelize } = require("../config/db.config");

const RefreshToken = db.define("refreshToken", {
  token: {
    type: Sequelize.STRING,
  },
  expiryDate: {
    type: Sequelize.DATE,
  },
});
module.exports = RefreshToken;
