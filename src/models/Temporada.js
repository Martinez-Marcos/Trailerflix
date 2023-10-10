const { DataTypes } = require('sequelize');
const sequelize = require('../conection');

const Temporada = sequelize.define('Temporadas', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resumen: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  contenido_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Temporada;