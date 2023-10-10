const { Catalogo, Categoria, Genero, ActorActriz, Temporada } = require('../models');

function instanciarCatalogo(CategInstan, datosPelicula) {
  return Catalogo.create({
    ...datosPelicula,
    categoria_id: CategInstan.dataValues.id
  });
}

function instanciarCategoria(categoria) {
  return Categoria.findOrCreate({
    where: { nombre: categoria }
  });
}

function InstanciarGenero(genero) {
  return Genero.findOrCreate({
    where: { nombre: genero }
  });
}

function instanciarReparto(actorActriz) {
  return ActorActriz.findOrCreate({
    where: { nombre_completo: actorActriz.nombre_completo },
    defaults: actorActriz
  });
}

function instanciarTemporada(i, instanciaPelicula) {
  return Temporada.create({
    contenido_id: instanciaPelicula.dataValues?.id,
    nombre_temporada: `Temporada ${i}`,
    resumen: `Resumen de la temporada ${i}`
  });
}


module.exports = { instanciarCatalogo, instanciarCategoria, InstanciarGenero, instanciarReparto, instanciarTemporada };