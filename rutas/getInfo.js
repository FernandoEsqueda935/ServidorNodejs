const express = require('express');
const router = express.Router();
const { getIdFromESP } = require('../controladores/getInfoDisController');

router.get('/id', getIdFromESP);

module.exports = router;