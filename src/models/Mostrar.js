const { DataTypes } = require('sequelize');
const sequelize = require('../conection');

const Mostrar = sequelize.define('mostrar', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  poster: DataTypes.STRING,
  titulo: DataTypes.STRING,
  categoria: DataTypes.STRING,
  generos: DataTypes.STRING,
  resumen: DataTypes.STRING,
  temporadas: DataTypes.STRING,
  reparto: DataTypes.STRING,
  trailer: DataTypes.STRING
}, {
  tableName: 'mostrar',
  timestamps: false,
  modelName: 'Mostrar'
});

module.exports = Mostrar;