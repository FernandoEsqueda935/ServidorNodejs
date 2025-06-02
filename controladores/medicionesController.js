const {Medicion} = require('../modelos');

const createMedicion = async (req, res) => {
  try {
    const now = new Date();
    const { valor, s_id } = req.body;
    const fecha = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const hora = now.toTimeString().split(' ')[0]; // HH:MM:SS
    if (!valor|| !s_id) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const nuevaMedicion = await Medicion.create({
        valor, s_id, fecha, hora
    });

    return res.status(201).json({
      mensaje: "Medición creada correctamente.",
      medicion: nuevaMedicion
    });
  } catch (error) {
    console.error("Error al crear medición:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

module.exports = {
  createMedicion
};