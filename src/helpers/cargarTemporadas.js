const Temporada = require('../models/Temporada');

// Manejo de temporadas con promesas
const cargarTemporadas = (temporadas, instanciaPelicula) => {
  if (temporadas > 0) {
    const temporadaPromises = [];
    for (let i = 1; i <= temporadas; i++) {
      const temporadaPromise = Temporada.create({
        contenidoId: instanciaPelicula.dataValues?.id,
        numeroTemporada: i,
        resumen: `Resumen de la temporada ${i}`
      });
      temporadaPromises.push(temporadaPromise);
    }

    return temporadaPromises;
  }
};

module.exports = cargarTemporadas;