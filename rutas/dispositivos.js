// routes/dispositivos.js
const express = require('express');
const router = express.Router();

const { crearDispositivo, getDispositivosSinRegistrar, updateDispositivoSinRegistrar } = require('../controladores/dispositivosController');

router.post('/dispositivos', crearDispositivo);
router.get('/sin-registrar', getDispositivosSinRegistrar);
router.put('/sin-registrar/:d_id', updateDispositivoSinRegistrar);

module.exports = router;
