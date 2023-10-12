const { DataTypes } = require('sequelize');
const sequelize = require('../conection');


const Catalogo = sequelize.define('catalogo', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  poster: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  resumen: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  trailer: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  tableName: 'catalogo',
  freezeTableName: true,
  timestamps: false
});

module.exports = Catalogo;