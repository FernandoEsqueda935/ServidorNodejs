

const express = require('express');
const router = express.Router();

const { createMedicion } = require('../controladores/medicionesController');

// Crear una medicion con s_id, valor (fecha y hora se generan automáticamente)
router.post('/', createMedicion); //Testeado

module.exports = router;