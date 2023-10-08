const Genero = require('./Genero');
const Categoria = require('./Categoria');
const ActorActriz = require('./ActorActriz');
const Catalogo = require('./Catalogo');
const Temporada = require('./Temporada');
const Mostrar = require('./Mostrar');

// Definir las relaciones entre los modelos

// Relación one-to-many entre Categoria y Catalogo
Categoria.hasMany(Catalogo, {
  foreignKey: 'categoria_id',
  timestamps: false,
  freezeTableName: true
});
Catalogo.belongsTo(Categoria, {
  foreignKey: 'id',
  timestamps: false,
  freezeTableName: true
});

// Relación many-to-many entre ActorActriz y Catalogo
ActorActriz.belongsToMany(Catalogo, {
  through: 'catalogos_actores',
  timestamps: false,
  foreignKey: 'actor_actriz_id',
  otherKey: 'contenido_id',
  freezeTableName: true
});
Catalogo.belongsToMany(ActorActriz, {
  through: 'catalogos_actores',
  foreignKey: 'contenido_id',
  otherKey: 'actor_actriz_id',
  timestamps: false,
  freezeTableName: true
});


// Relación one-to-many entre Catalogo y Temporadas
Catalogo.hasMany(Temporada, {
  foreignKey: 'contenido_id',
  timestamps: false,
  freezeTableName: true
});
Temporada.belongsTo(Catalogo, {
  foreignKey: 'contenido_id',
  timestamps: false,
  freezeTableName: true
});

// Relación many-to-many entre Genero y Catalogo
Catalogo.belongsToMany(Genero, {
  through: 'generos_catalogos',
  foreignKey: 'contenido_id',
  otherKey: 'genero_id',
  timestamps: false,
  freezeTableName: true
});
Genero.belongsToMany(Catalogo, {
  through: 'generos_catalogos',
  foreignKey: 'genero_id',
  otherKey: 'contenido_id',
  timestamps: false,
  freezeTableName: true
});

module.exports = { Genero, Categoria, ActorActriz, Catalogo, Mostrar };