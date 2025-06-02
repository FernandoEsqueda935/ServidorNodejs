// controllers/dispositivosController.js
const { Dispositivo } = require('../modelos');

const crearDispositivo = async (req, res) => {
  try {
    const { nombre, lugar } = req.body;

    if (!nombre || !lugar) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const nuevoDispositivo = await Dispositivo.create({ nombre, lugar });

    return res.status(201).json({
      mensaje: "Dispositivo creado correctamente.",
      dispositivo: nuevoDispositivo
    });
  } catch (error) {
    console.error("Error al crear dispositivo:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  crearDispositivo
};
