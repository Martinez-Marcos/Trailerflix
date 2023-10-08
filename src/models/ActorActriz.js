const { DataTypes } = require('sequelize');
const sequelize = require('../conection');


const actor_actriz = sequelize.define('actores_actrices', {
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  es_principal: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = actor_actriz;