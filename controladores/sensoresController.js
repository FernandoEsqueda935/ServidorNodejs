const { Sensor } = require('../modelos');

const createSensor = async (req, res) => {
  try {
    const { nombre, tipo, d_id, lugar } = req.body;

    if (!nombre || !tipo || !d_id) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const nuevoSensor = await Sensor.create({
      nombre,
      tipo,
      d_id,
      lugar
    });

    return res.status(201).json({
      mensaje: "Sensor creado correctamente.",
      sensor: nuevoSensor
    });
  } catch (error) {
    console.error("Error al crear sensor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

module.exports = {
  createSensor
};  