const { DataTypes } = require('sequelize');
const sequelize = require('../conection');


const Categoria = sequelize.define('categorias', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Categoria;