
const net = require('net');
const express = require('express');
const cors = require('cors');
const app = express();
const dispositivosRoutes = require('./rutas/dispositivos');
const sensoresRoutes = require('./rutas/sensores');
const medicionesRoutes = require('./rutas/mediciones');


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

    socket.on('data', (data) => {



        console.log('Datos recibidos:', data);

        const frame = parseTcpFrame(data);

        console.log('Frame recibido:');
        console.log('  code:', frame.code);
        console.log('  dev_id:', frame.dev_id);
        console.log('  op_code:', frame.op_code);
        console.log('  aux_code:', frame.aux_code);
        console.log('  len:', frame.len);
        console.log('  payload:', frame.payload.toString());

        const responseFrame = executeCmd(frame);
        
        buffer = serializeTcpFrame(responseFrame);
        console.log('Frame serializado:', buffer);

        socket.write(buffer, (err) => {
            if (err) {
                console.error('Error al enviar datos al cliente:', err);
            } else {
                console.log('Datos enviados al cliente:', buffer);
            }
        });
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

