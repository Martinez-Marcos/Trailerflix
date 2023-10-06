const { DataTypes } = require('sequelize');
const sequelize = require('../conection');

const Genero = sequelize.define('generos', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Genero;
