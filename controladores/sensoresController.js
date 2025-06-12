const { Sensor } = require('../modelos');
const Struct = require('struct-fu');
const { sendCmd } = require('../tcp_server/tcpServer');

const createSensor = async (req, res) => {
  const tcp_frame_t = Struct.struct([
  Struct.uint8('code'),
  Struct.uint8('d_id'),
  Struct.uint8('s_id'),
  Struct.uint8('op_code'),
  Struct.uint32('valor')
  ]);
  let frame = {
    code: 0,
    d_id: 0,
    s_id: 0,
    op_code: 0,
    valor: 0
  }

  try {
    const { nombre, tipo, d_id, lugar, slot } = req.body;


    //si la conexion sigue viva entonces se puede hacer la configuracion

    if (!nombre || !tipo || !d_id) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const nuevoSensor = await Sensor.create({
      nombre,
      tipo,
      d_id,
      lugar,
      slot
    });

    frame.d_id = 0;
    frame.s_id = slot; // Asumiendo que 'nuevoSensor' es el sensor recién creado
    frame.op_code = 'S'.charCodeAt(0); // Código de operación para crear sensor
    frame.valor = nuevoSensor.s_id; // Asumiendo que 's_id' es el ID del sensor recién creado
    const mensaje = tcp_frame_t.pack(frame);

    sendCmd(mensaje);

    return res.status(201).json({
      mensaje: "Sensor creado correctamente.",
      sensor: nuevoSensor
    });
  } catch (error) {
    console.error("Error al crear sensor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

const getSensores = async (req, res) => {
  const { d_id } = req.params;
  try {
    const sensores = await Sensor.findAll(
      {
        where: { d_id },
        order: [['slot', 'ASC']]
      }
    );
    res.status(200).json(sensores);
  } catch (error) {
    console.error("Error al obtener sensores:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const setSensoresOffset = async (req, res) => {
  const { s_id, offset } = req.body;
  try {
    const sensor = await Sensor.findByPk(s_id);
    if (!sensor) {
      return res.status(404).json({ error: "Sensor no encontrado." });
    }

    sensor.offset = offset;
    await sensor.save();

    return res.status(200).json({
      mensaje: "Offset actualizado correctamente.",
      sensor
    });
  } catch (error) {
    console.error("Error al actualizar offset:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const updateSensores = async (req, res) => {
  const { tipo, nombre, lugar } = req.body;
  s_id = req.params.s_id;
  try {
    const sensor = await Sensor.findByPk(s_id);
    if (!sensor) {
      return res.status(404).json({ error: "Sensor no encontrado." });
    }

    sensor.tipo = tipo;
    sensor.nombre = nombre;
    sensor.lugar = lugar;
    await sensor.save();

    return res.status(200).json({
      mensaje: "Sensor actualizado correctamente.",
      sensor
    });
  } catch (error) {
    console.error("Error al actualizar sensor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

const getSensorById = async (s_id) => {
  try {
    const sensor = await Sensor.findByPk(s_id);
    if (!sensor) {
      throw new Error("Sensor no encontrado");
    }
    return sensor;
  } catch (error) {
    console.error("Error al obtener sensor por ID:", error);
    throw error;
  }
}

const setUmbral = async (req, res) => {
  const { s_id, umbral } = req.body;
  try {
    const sensor = await Sensor.findByPk(s_id);
    if (!sensor) {
      return res.status(404).json({ error: "Sensor no encontrado." });
    }

    sensor.umbral = umbral;
    await sensor.save();

    return res.status(200).json({
      mensaje: "Umbral actualizado correctamente.",
      sensor
    });
  } catch (error) {
    console.error("Error al actualizar umbral:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  createSensor,
  getSensores,
  setSensoresOffset,
  updateSensores,
  getSensorById,
  setUmbral,
};