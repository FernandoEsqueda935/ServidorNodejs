function executeCmd(frame) {
    switch (frame.op_code) {
        case 0x01:
            const len = 2;
            frame.payload = Buffer.alloc(len); 
            frame.payload.writeUInt16BE(0x0001, 0); 
            frame.len = len; 
            break;

        case 0x04:
            console.log('data:', frame.payload.toString());
            frame.len = 3;
            frame.payload = Buffer.from("ACK"); // Ejemplo de payload
            break;

        default:
            console.log('Comando no reconocido:', frame.op_code);
            break;
    }
    return {
        code: frame.code,
        op_code: frame.op_code,
        dev_id: frame.dev_id,
        aux_code: frame.aux_code,
        len: frame.len,
        payload: frame.payload 
    };
}