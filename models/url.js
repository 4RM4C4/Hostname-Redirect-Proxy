const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Url extends Model {}

Url.init({
  hostname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'url',
  underscored: true,
  timestamps: false
});

module.exports = Url;
