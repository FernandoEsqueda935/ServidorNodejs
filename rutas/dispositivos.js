// routes/dispositivos.js
const express = require('express');
const router = express.Router();

const { crearDispositivo } = require('../controladores/dispositivosController');
const d_id_to_esp = require('../middlewares/d_id_esp');

router.post('/dispositivos', d_id_to_esp, crearDispositivo);

module.exports = router;
