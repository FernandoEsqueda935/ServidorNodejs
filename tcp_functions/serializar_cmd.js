function serializeTcpFrame(frame) {
    const len = frame.payload ? frame.payload.length : 0;
    const buffer = Buffer.alloc(1 + 2 + 1 + 1 + 1 + len); 

    let offset = 0;
    buffer.writeUInt8(frame.code, offset);
    offset += 1;

    buffer.writeUInt16BE(frame.dev_id, offset);
    offset += 2;

    buffer.writeUInt8(frame.op_code, offset);
    offset += 1;

    buffer.writeUInt8(frame.aux_code, offset);
    offset += 1;

    buffer.writeUInt8(len, offset);
    offset += 1;

    if (len > 0) {
        frame.payload.copy(buffer, offset, 0, len);
    }

    return buffer;
}