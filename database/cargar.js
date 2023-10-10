const fs = require('fs');
const path = require('path');

const crearContenido = require('../src/controller/crearContenido');

// Lee el contenido del archivo
const archivoSQL = path.join(__dirname, 'trailerflix.json');
const contenidosJson = JSON.parse(fs.readFileSync(archivoSQL, 'utf8'));
const contenidos = contenidosJson.map((p) => p);

async function cargarPeliculas() {
  try {
    for (const contenido of contenidos) {
      // eslint-disable-next-line no-await-in-loop
      await crearContenido(contenido);
    }
  } catch (error) {
    console.error('Error al cargar las películas:', error);
    return;
  }
  console.log('Películas cargadas con éxito.');
}
cargarPeliculas();