
const net = require('net');
const express = require('express');
const cors = require('cors');
const Struct = require('struct-fu');
const app = express();
const dispositivosRoutes = require('./rutas/dispositivos');
const sensoresRoutes = require('./rutas/sensores');
const medicionesRoutes = require('./rutas/mediciones');
const { startTCPServer } = require('./tcp_server/tcpServer');
const getInfoRoutes = require('./rutas/getInfo');

app.use(cors());

app.use(express.json());
app.use('/dispositivos', dispositivosRoutes);
app.use('/sensores', sensoresRoutes);
app.use('/mediciones', medicionesRoutes);
app.use('/get-info', getInfoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

startTCPServer(4000);