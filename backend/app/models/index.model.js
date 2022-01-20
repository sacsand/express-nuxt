const { db, Sequelize } = require("../config/db.config");

const models = {};
models.db = db;
models.sq = Sequelize;

models.user = require("./user.model");
models.refreshToken = require("./refreshToken.model");

models.refreshToken.belongsTo(models.user, {
  foreignKey: "userId",
  tragetKey: "id",
});
models.user.hasOne(models.refreshToken, {
  foreignKey: "userId",
  tragetKey: "id",
});

module.exports = models;
