const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const { Catalogo, Genero, Categoria, Mostrar } = require('../models');

const datosNulos = require('../helpers/datosNulos');
const parsearPeliculas = require('../helpers/parsearPeliculas');
const Temporada = require('../models/Temporada');

// Endpoint para agregar las peliculas a la base de datos

router.post('/', async (req, res) => {
  const { poster, titulo, genero, resumen, categoria, temporadas, reparto, trailer } = req.body;

  const datosPelicula = { poster, titulo, resumen, trailer };

  if (datosNulos({ genero, temporadas, reparto, ...datosPelicula })) res.status(400).json({ error: 'Faltan datos necesarios' });

  try {
    // Busca o crea la categoría
    const [InstanciaDeCategorias] = await Categoria.findOrCreate({
      where: { nombre: categoria }
    });

    // Busca o crea los géneros y asócialos a la película
    const GenerosInstances = await Promise.all(genero.split(',').map((nombreGenero) => Genero.findOrCreate({
      where: { nombre: nombreGenero }
    })));

    // Crea la película, asocia la categoría, los géneros
    const InstanciaDePelicula = await Catalogo.create({
      ...datosPelicula,
      categoriaId: InstanciaDeCategorias.dataValues?.id
    });

    await InstanciaDePelicula.addGeneros(GenerosInstances.map((g) => g[0]));

    // Crea y asocia las temporadas
    if (temporadas !== 'N/A' && temporadas) {
      const temporadaPromises = [];
      for (let i = 1; i <= temporadas; i++) {
        const temporadaPromise = Temporada.create({
          contenido_id: InstanciaDePelicula.dataValues?.id,
          nombre_temporada: `Temporada ${i}`,
          resumen: `Resumen de la temporada ${i}`
        });
        temporadaPromises.push(temporadaPromise);
      }
      Promise.all(temporadaPromises);
    }

    res.status(201).send.json({ message: 'Pelicula cargada con exito' });
  } catch (error) {
    res.status(500).send.json({ message: 'Error al cargar la pelicula' });
  }
});

// Endpoint para obtener todo el catálogo
router.get('/', async (req, res) => {
  try {
    const catalogo = await Mostrar.findAll();
    const catalogoParseado = parsearPeliculas(catalogo);
    res.status(200).json(catalogoParseado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el catálogo.' });
  }
});

// Endpoint para filtrar por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contenido = await Mostrar.findByPk(id);
    if (!contenido) return res.status(404).json({ message: 'No se ah encontrado ningun contenido con ese id' });
    const contenidoParseado = parsearPeliculas(contenido);

    res.status(200).json(contenidoParseado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el contenido.' });
  }
});

// Endpoint para filtrar por nombre
router.get('/nombre/:nombre', async (req, res) => {
  const { nombre } = req.params;
  try {
    const contenido = await Mostrar.findAll({
      where: {
        titulo: {
          [Op.like]: `%${nombre}%`
        }
      }
    });

    if (!contenido) return res.status(404).json({ message: 'No se ah encontrado ningun contenido con ese nombre' });
    const contenidoParseado = parsearPeliculas(contenido);

    res.status(200).json(contenidoParseado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el contenido.' });
  }
});

// Endpoint para filtrar por género
router.get('/genero/:genero', async (req, res) => {
  const { genero } = req.params;
  try {
    const contenido = await Mostrar.findAll({
      include: [
        {
          model: Genero,
          where: { nombre: genero }
        }
      ]
    });

    if (!contenido) return res.status(404).json({ message: 'No se ah encontrado ningun contenido con ese genero' });
    const contenidoParseado = parsearPeliculas(contenido);

    res.status(200).json(contenidoParseado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el contenido.' });
  }
});

// Endpoint para filtrar por categoría
router.get('/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params;
  try {
    const contenido = await Mostrar.findAll({
      include: [
        {
          model: Categoria,
          where: { nombre: categoria }
        }
      ]
    });

    if (!contenido) return res.status(404).json({ message: 'No se ah encontrado ningun contenido con esa categoría' });
    const contenidoParseado = parsearPeliculas(contenido);

    res.status(200).json(contenidoParseado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el contenido.' });
  }
});

module.exports = router;