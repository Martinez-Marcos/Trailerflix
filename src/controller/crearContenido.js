const { instanciarCategoria, instanciarCatalogo } = require('./intancias');
const { fucionarGenero, fusionarReparto, fusionarTemporadas } = require('./transformarDatos');

async function crearContenido(contenido) {
  const { categoria, genero, reparto, temporadas, ...datosPelicula } = contenido;

  // Busca o crea la categoría
  const [instanciaCategoria] = await instanciarCategoria(categoria);

  // Busca o crea los géneros
  const generos = await fucionarGenero(genero);

  // Crea la película y asocia la categoría y los géneros
  const instanciaPelicula = await instanciarCatalogo(instanciaCategoria, datosPelicula);
  await instanciaPelicula.addGenero(generos.map((g) => g[0].dataValues.id));

  // Crea o encuentra a los actores y actrices
  const actoresCreados = await fusionarReparto(reparto);
  await instanciaPelicula.addActores_actrices(actoresCreados.map((a) => a[0].dataValues.id));

  // Cargar temporadas
  if (temporadas !== 'N/A' && temporadas) fusionarTemporadas(temporadas, instanciaPelicula);
}

module.exports = crearContenido;