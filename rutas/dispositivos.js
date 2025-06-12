// routes/dispositivos.js
const express = require('express');
const router = express.Router();

const { crearDispositivo, getDispositivosSinRegistrar, updateDispositivoSinRegistrar, createDispositivoSinRegistrar} = require('../controladores/dispositivosController');

router.post('/dispositivos', crearDispositivo);
router.get('/sin-registrar', getDispositivosSinRegistrar);
router.put('/sin-registrar/:d_id', updateDispositivoSinRegistrar);
router.post('/sin-registrar', createDispositivoSinRegistrar);
//router.get('/id-conectado', getIdConnectedDevice);
module.exports = router;
