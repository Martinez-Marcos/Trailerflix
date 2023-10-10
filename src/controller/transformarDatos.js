const { InstanciarGenero, instanciarReparto, instanciarTemporada } = require('./intancias');

function fusionarGenero(genero) {
  const generos = genero.split(', ');
  const GenerosInstan = [];
  for (const nombreG of generos) {
    const GenInstan = InstanciarGenero(nombreG);
    GenerosInstan.push(GenInstan);
  }
  return Promise.all(GenerosInstan);
}

function fusionarReparto(reparto) {
  const rep = reparto.split(', ').map((nombreActor) => ({
    nombre_completo: nombreActor,
    es_principal: true
  }));
  const repartoCompleto = rep.map((actor) => instanciarReparto(actor));
  return Promise.all(repartoCompleto);
}

function fusionarTemporadas(temporadas, instanciaPelicula) {
  const tempProms = [];
  for (let i = 1; i <= temporadas; i++) {
    const temporadaPromise = instanciarTemporada(i, instanciaPelicula);
    tempProms.push(temporadaPromise);
  }
  return Promise.all(tempProms);
}

module.exports = { fucionarGenero: fusionarGenero, fusionarReparto, fusionarTemporadas };


