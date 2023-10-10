const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const crearContenido = require('../controller/crearContenido');

const datosNulos = require('../helpers/datosNulos');
const parsearPeliculas = require('../helpers/parsearPeliculas');
const { Mostrar } = require('../models');

// Endpoint para agregar pelicula
router.post('/', (req, res) => {
  const { poster, titulo, genero, resumen, categoria, temporadas, reparto, trailer } = req.body;

  const pelicula = { poster, titulo, genero, resumen, categoria, temporadas, reparto, trailer };

  if (datosNulos(pelicula)) res.status(400).json({ message: 'Faltan datos necesarios' });

  crearContenido(pelicula)
    .then((constenido) => res.status(201).send.json({ message: 'Contenido creado con exito', payload: constenido }))
    .catch((error) => {
      res.status(500).send.json({ message: 'Error al cargar la pelicula', error });
    });
});

// Endpoint para obtener todo el catálogo
router.get('/', async (req, res) => {
  try {
    const catalogo = await Mostrar.findAll();
    if (!catalogo || catalogo === null) return res.status(404).json({ message: 'No hay contenidos' });

    const catalogoParseado = parsearPeliculas(catalogo);
    res.status(200).json(catalogoParseado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el catálogo.', error });
  }
});

// Endpoint para filtrar por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) return res.status(300).json({ message: 'el id debe ser un numero' });

  try {
    const contenido = await Mostrar.findByPk(id);

    if (!contenido || contenido === null) return res.status(404).json({ message: 'No se ah encontrado ningun contenido con ese id' });

    const contenidoParseado = parsearPeliculas(contenido);
    res.status(200).json(contenidoParseado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contenido.', error });
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
    console.log(contenido.toString());

    if (!contenido.toString() || contenido === null) {
      return res.status(404).json({ message: 'No se ah encontrado ningun contenido con ese nombre' });
    }

    const contenidoParseado = parsearPeliculas(contenido);
    res.status(200).json(contenidoParseado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contenido.', error });
  }
});

// Endpoint para filtrar por género
router.get('/genero/:genero', async (req, res) => {
  const { genero } = req.params;
  try {
    const contenido = await Mostrar.findAll({
      where: {
        generos: {
          [Op.like]: `%${genero}%`
        }
      }
    });

    if (!contenido.toString() || contenido === null) return res.status(404).json({ message: 'No se ah encontrado ningun contenido con ese genero' });

    const contenidoParseado = parsearPeliculas(contenido);
    res.status(200).json(contenidoParseado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contenido.', error });
  }
});

// Endpoint para filtrar por categoría
router.get('/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params;
  try {
    const contenido = await Mostrar.findAll({
      where: { categoria }
    });

    // eslint-disable-next-line max-len
    if (!contenido.toString() || contenido === null) return res.status(404).json({ message: 'No se ah encontrado ningun contenido con esa categoría' });

    const contenidoParseado = parsearPeliculas(contenido);
    res.status(200).json(contenidoParseado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener el contenido.', error });
  }
});

module.exports = router;