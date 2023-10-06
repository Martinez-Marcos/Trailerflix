const datosNulos = (pelicula) => {
  const valores = Object.values(pelicula);
  return valores.some((valor) => valor === null || typeof valor === 'undefined');
};

module.exports = datosNulos;