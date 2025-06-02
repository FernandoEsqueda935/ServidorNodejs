const express = require('express');
const router = express.Router();

const { createSensor } = require('../controladores/sensoresController');

// Crear un sensor con nombre, tipo, d_id y lugar
router.post('/', createSensor);  //testeado 

module.exports = router;