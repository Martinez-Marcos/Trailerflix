const parsearPelicula = require('./parsearPelicula');

const parsearPeliculas = (pelis) => (Array.isArray(pelis) ? pelis.map((p) => parsearPelicula(p)) : parsearPelicula(pelis));

module.exports = parsearPeliculas;