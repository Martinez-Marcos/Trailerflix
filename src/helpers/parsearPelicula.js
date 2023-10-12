
const parsearPelicula = (pelicula) => {
  const URLimagenes = 'http://www.trailerflix.com/imagenes';

  const { id, poster: posterIncompleto, titulo, generos, resumen, categoria, temporadas, reparto, trailer } = pelicula;

  const poster = URLimagenes.concat(posterIncompleto.slice(0, -4));

  const peliculaParseada = { id: id || null, poster, titulo, categoria, generos, resumen, temporadas, reparto, trailer };
  return peliculaParseada;
};

module.exports = parsearPelicula;