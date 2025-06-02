const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('iot', 'root', 'Ibiza123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
