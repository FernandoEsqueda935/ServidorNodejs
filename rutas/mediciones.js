

const express = require('express');
const router = express.Router();

const { createMedicion, getLastMediciones, createMedicionFechaYHora } = require('../controladores/medicionesController');

// Crear una medicion con s_id, valor (fecha y hora se generan automáticamente)
router.post('/', createMedicion); //Testeado
//Obtiene las ultimas 10 mediciones de un sensor por su s_id
router.get('/last/:s_id', getLastMediciones);
// Crear una medicion con s_id, valor, fecha y hora
router.post('/fecha-y-hora', createMedicionFechaYHora); //Testeado
module.exports = router;