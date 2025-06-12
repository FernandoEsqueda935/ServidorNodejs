const { Notificacion } = require('../modelos');

const createNotificacion = async (req, res) => {
  try {
    const { s_id } = req.body;
    if (!s_id) {
      return res.status(400).json({ error: "Falta el s_id." });
    }

    const nuevaNotificacion = await Notificacion.create({ s_id });
    return res.status(201).json({
      mensaje: "Notificación creada correctamente.",
      notificacion: nuevaNotificacion
    });
  } catch (error) {
    console.error("Error al crear notificación:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.findAll({
      order: [['fecha', 'DESC']]
    });
    return res.status(200).json(notificaciones);
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  createNotificacion,
  getNotificaciones
};