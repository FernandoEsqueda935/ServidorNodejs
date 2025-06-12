const express = require('express');
const router = express.Router();

const { createSensor, getSensores, setSensoresOffset, updateSensores, setUmbral} = require('../controladores/sensoresController');

// Crear un sensor con nombre, tipo, d_id y lugar
router.post('/', createSensor);  //testeado 
router.get('/:d_id', getSensores); //testeado
router.post('/offset', setSensoresOffset);
router.put('/:s_id', updateSensores); // Actualizar offset de un sensor específico
router.put('/update/umbral', setUmbral);

module.exports = router;