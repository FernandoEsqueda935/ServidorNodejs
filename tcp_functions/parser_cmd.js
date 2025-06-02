function parseTcpFrame(data) {
    let offset = 0;

    const code = data.readUInt8(offset);
    offset += 1;

    const dev_id = data.readUInt16BE(offset);
    offset += 2;

    const op_code = data.readUInt8(offset);
    offset += 1;

    const aux_code = data.readUInt8(offset);
    offset += 1;

    const len = data.readUInt8(offset);
    offset += 1;

    var payload = '\0'; 

    if (len > 0) {
        payload = data.slice(offset, offset + len);
    }
    return {
        code,
        dev_id,
        op_code,
        aux_code,
        len,
        payload
    };
}