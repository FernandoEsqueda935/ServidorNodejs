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

const CreateDispositivoSinRegistrar = async () => {
  try {
    const d = await Dispositivo.create({
      nombre: null,
      lugar: null
    });

    return d;
  }
  catch (error) {
    return error;
  }
}

const getDispositivosSinRegistrar = async (req, res) => {
  try {
    const dispositivos = await Dispositivo.findAll({
      where: {
        nombre: null,
        lugar: null
      }
    });
    res.status(200).json(dispositivos);
  } catch (error) {
    console.error("Error al obtener dispositivos sin registrar:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const updateDispositivoSinRegistrar = async (req, res) => {
  const { d_id } = req.params;
  const { nombre, lugar } = req.body;

  try {
    const dispositivo = await Dispositivo.findByPk(d_id);
    if (!dispositivo) {
      return res.status(404).json({ error: "Dispositivo no encontrado." });
    }

    dispositivo.nombre = nombre;
    dispositivo.lugar = lugar;
    await dispositivo.save();

    res.status(200).json({
      mensaje: "Dispositivo actualizado correctamente.",
      dispositivo
    });
  } catch (error) {
    console.error("Error al actualizar dispositivo:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
}

module.exports = {
  crearDispositivo,
  CreateDispositivoSinRegistrar,
  getDispositivosSinRegistrar,
  updateDispositivoSinRegistrar
};
