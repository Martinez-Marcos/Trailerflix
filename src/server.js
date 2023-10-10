const express = require('express');
const server = express();

const path = require('path');

const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const sequelize = require('./conection');
const catalogo = require('./routes/catalogo');
const categorias = require('./routes/categorias');


// Variables del servidor
server.set('PORT', process.env.SERVER_PORT || 3001);
server.set('HOST', process.env.SERVER_HOST || 'localhost');

// Middlewares
server.use(express.json());

// Rutas
server.use('/catalogo', catalogo);
server.use('/categorias', categorias);

// Control de rutas inexistentes
server.use('*', (req, res) => {
  res.status(404).send({ error: `La URL indicada no existe en este servidor` });
});

// Manejo de errores
server.use((err, req, res) => {
  console.log(err);
  res.status(500).send('Error en el servidor');
});

// Método oyente de solicitudes
sequelize.authenticate().then(() => {
  sequelize.sync({ force: false, alter: false }).then(() => {
    server.listen(server.get('PORT'), server.get('HOST'), () => {
      console.log(`El servidor está escuchando en: http://${server.get('HOST')}:${server.get('PORT')}/catalogo`);
    });
  }).catch(() => {
    console.log('Hubo un problema con la sincronización con la base de datos.');
  });
}).catch(() => {
  console.log('Hubo un problema con la conección a la base de datos.');
});
