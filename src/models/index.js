const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user')(sequelize, DataTypes);
const Reporte = require('./reporte')(sequelize, DataTypes);

module.exports = {
    sequelize,
    User,
    Reporte,
  };