
const net = require('net');
const express = require('express');
const cors = require('cors');
const app = express();
const dispositivosRoutes = require('./rutas/dispositivos');
const sensoresRoutes = require('./rutas/sensores');
const medicionesRoutes = require('./rutas/mediciones');
const d_id_to_esp = require('./middlewares/d_id_esp');

app.use(cors());

app.use(express.json());
app.use('/dispositivos', dispositivosRoutes);
app.use('/sensores', sensoresRoutes);
app.use('/mediciones', medicionesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


const server = net.createServer((socket) => {
    console.log('Nuevo cliente conectado:', socket.remoteAddress, socket.remotePort);
    socket.on('data', async (data) => {
        const msg = data.toString();
        console.log('Mensaje recibido:', msg);
        if (msg === "0I0") {
            const id = await d_id_to_esp();
            console.log('ID del dispositivo:', id);
            socket.write(`d_id: ${id}\n`);
        } else {
            socket.write(`Mensaje recibido: ${msg}\n`);
        }
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });

    socket.on('error', (err) => {
       
        console.error('Error en conexión:', err);
    });
});

server.listen(4000, '0.0.0.0', () => {
    console.log('Servidor TCP escuchando en puerto 4000');
});

