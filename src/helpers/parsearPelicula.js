
const parsearPelicula = (pelicula) => {
  const URLimagenes = 'http://www.trailerflix.com/imagenes';

  const { id, poster: posterIncompleto, titulo, genero, resumen, categoria, temporadas, reparto, trailer } = pelicula;

  const poster = URLimagenes.concat(posterIncompleto);

  const peliculaParseada = { id, poster, titulo, categoria, genero, resumen, temporadas, reparto, trailer };
  return peliculaParseada;
};

module.exports = parsearPelicula;