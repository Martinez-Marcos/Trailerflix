const { DataTypes } = require('sequelize');
const sequelize = require('../conection');

const Temporada = sequelize.define('Temporadas', {
  nombre_temporada: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  resumen: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Temporada;