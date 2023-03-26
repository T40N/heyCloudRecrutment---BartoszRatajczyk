const Sequalize = require("sequelize");

const sequelize = new Sequalize("postgres", "postgres", "postgres", {
  dialect: "postgres",
});

module.exports = sequelize;
