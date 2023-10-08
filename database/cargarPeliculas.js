/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
// eslint-disable-next-line lines-around-comment
const { Catalogo, Genero, Categoria, ActorActriz } = require('../src/models');

const fs = require('fs');
const path = require('path');

// Lee el contenido del archivo
const archivoSQL = path.join(__dirname, 'trailerflix.json');
const peliculas = JSON.parse(fs.readFileSync(archivoSQL, 'utf8'));

// Función pargar películas
function cargarPeliculas() {
  try {
    // Inserta las películas en la base de datos
    peliculas.map(async (pelicula) => {
      const { categoria, genero, reparto, ...datosPelicula } = pelicula;

      // Busca o crea la categoría
      const [CategoriasInstance] = await Categoria.findOrCreate({
        where: { nombre: categoria }
      });

      // Busca o crea los géneros y los asocia a la película
      const GenerosInstances = await Promise.all(genero.split(',').map((nombreGenero) => Genero.findOrCreate({
        where: { nombre: nombreGenero }
      })));

      // Crea la película y asocia la categoría y los géneros
      const peliculaInstance = await Catalogo.create({
        ...datosPelicula,
        categoria_id: CategoriasInstance.dataValues.id
      });

      await peliculaInstance.addGeneros(GenerosInstances.map((g) => g[0]));

      // Reparto (actores y actrices)
      const actoresReparto = reparto.split(', ').map((nombreActor) => ({
        nombre_completo: nombreActor,
        es_principal: true
      }));

      // Crea o encuentra a los actores y actrices
      const ActoresInstances = await Promise.all(actoresReparto.map(async (actor) => {
        const [ActorInstance] = await ActorActriz.findOrCreate({
          where: { nombre_completo: actor.nombre_completo },
          defaults: actor
        });
        return ActorInstance;
      }));

      // Asocia a los actores y actrices con la película
      await peliculaInstance.addActores_actrices(ActoresInstances);
    });

    console.log('Películas cargadas con éxito.');
  } catch (error) {
    console.error('Error al cargar las películas:', error);
  }
}
cargarPeliculas();