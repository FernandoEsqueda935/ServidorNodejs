const net = require('net');
const Struct = require('struct-fu');
const { createDispositivoSinRegistrar } = require('../controladores/dispositivosController');
const { crearMedicionTCP } = require('../controladores/medicionesController');
const { enviarTelegram } = require('../telegram/tg');
const { send } = require('process');

let TCPconn = null;
const d_id_from_esp = { d_id: null };

function getID() {
    if (d_id_from_esp.d_id) {
        return d_id_from_esp.d_id;
    } else {
        console.error('No hay un d_id disponible desde el ESP.');
        return null;
    }
}

function sendCmd(cmd) {
    if (TCPconn && TCPconn.writable) {
        TCPconn.write(cmd);
    } else {
        console.error('No hay conexión TCP activa para enviar el comando.');
    }
}

const tcp_frame_t = Struct.struct([
    Struct.uint8('code'),
    Struct.uint8('d_id'),
    Struct.uint8('s_id'),
    Struct.uint8('op_code'),
    Struct.uint32('valor')
]);

const server = net.createServer((socket) => {
    TCPconn = socket;
    

    console.log('Nuevo cliente conectado:', socket.remoteAddress, socket.remotePort);
    socket.on('data', async (data) => {
        
        try {
            let frame = tcp_frame_t.unpack(data);
            console.log('Estructura recibida:', frame);
            switch (String.fromCharCode(frame.op_code)) {
                case 'D':
                    const d = await createDispositivoSinRegistrar()
                    frame.d_id = d.d_id; 
                    const response = tcp_frame_t.pack(frame);
                    console.log('Estructura empaquetada:', frame);
                    socket.write(response);
                    d_id_from_esp.d_id = frame.d_id;
                    break;
                case 'M':
                    const measure = frame.valor;
                    console.log('Medición recibida:', measure);
                    const medicion = await crearMedicionTCP(frame.valor, frame.s_id);
                    break;
                case 'C':
                    d_id_from_esp.d_id = frame.d_id;
                    break;
                case 'U':
                    enviarTelegram(`Sensor rebasó el umbral de consumo: sensor ID: ` + (frame.valor) );
                    console.log('Sensor rebasó el umbral de consumo:', frame.valor);
                    break;
                default:
                    console.log('Código no reconocido:', String.fromCharCode(frame.valor));
                    break;
            }
        } catch (err) {
            console.error('Error desempaquetando estructura:', err);
        }
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
        TCPconn = null;
        d_id_from_esp.d_id = null;
    });

    socket.on('error', (err) => {
        console.error('Error en conexión:', err);
        d_id_from_esp.d_id = null;
    });
});

function startTCPServer(port = 4000) {
    server.listen(port, '0.0.0.0', () => {
        console.log(`Servidor TCP escuchando en puerto ${port}`);
    });
}

module.exports = { sendCmd, startTCPServer, getID};