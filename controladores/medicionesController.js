const { Medicion, Sensor } = require('../modelos');
const { getSensorById } = require('./sensoresController');
const { enviarNotificacionIoT } = require('../telegram/tg');
const { Notificacion } = require('../modelos');

const createMedicion = async (req, res) => {
  try {
    const now = new Date();
    // Usa la fecha local en formato YYYY-MM-DD
    const fecha = now.toLocaleDateString('en-CA'); // 'en-CA' => YYYY-MM-DD
    const hora = now.toLocaleTimeString('en-GB', { hour12: false }); // HH:MM:SS
    const { valor, s_id } = req.body;

    if (!valor || !s_id) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const nuevaMedicion = await Medicion.create({
      valor, s_id, fecha, hora
    });

    const sensor = await getSensorById(s_id);

    console.log("Sensor encontrado:", valor, sensor.umbral);
    if (sensor.umbral < valor) {
      // Buscar la última notificación para este sensor
      const ultimaNotificacion = await Notificacion.findOne({
        where: { s_id },
        order: [['fecha', 'DESC']]
      });

      let enviarTelegrama = false;

      if (!ultimaNotificacion) {
        // No hay notificaciones previas, se debe enviar
        enviarTelegrama = true;
      } else {
        // Compara la fecha de la última notificación con la actual
        const fechaUltima = new Date(ultimaNotificacion.fecha);
        const diferenciaMs = now - fechaUltima;
        const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
        if (diferenciaHoras >= 1) {
          enviarTelegrama = true;
        }
      }

      await Notificacion.create({ s_id });

      if (enviarTelegrama) {
        const mensaje = `Sensor ${sensor.nombre} (${sensor.s_id}) ha rebasado el umbral de consumo: ${valor}`;
        enviarNotificacionIoT(mensaje);
      }
    }

    return res.status(201).json({
      mensaje: "Medición creada correctamente.",
      medicion: nuevaMedicion
    });
  } catch (error) {
    console.error("Error al crear medición:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
const createMedicionFechaYHora = async (req, res) => {
  try {
    const { valor, s_id, fecha, hora } = req.body;
    if (!valor || !s_id || !fecha || !hora) {
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

const getLastMediciones = async (req, res) => {
  try {
    const { s_id } = req.params;
    if (!s_id) {
      return res.status(400).json({ error: "Falta el s_id." });
    }

    const mediciones = await Medicion.findAll({
      where: { s_id },
      order: [['fecha', 'DESC'], ['hora', 'DESC']],
      limit: 20
    });

    return res.status(200).json(mediciones);
  } catch (error) {
    console.error("Error al obtener mediciones:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}
/// funciones para servidor tcp
const crearMedicionTCP = async (valor, s_id) => { 
  const now = new Date();
  const fecha = now.toLocaleDateString('en-CA'); // YYYY-MM-DD local
  const hora = now.toLocaleTimeString('en-GB', { hour12: false }); // HH:MM:SS local
  try {
    const nuevaMedicion = await Medicion.create({
      valor, s_id, fecha, hora
    });

    // Obtener el sensor y su umbral
    const sensor = await Sensor.findByPk(s_id);
    if (sensor && sensor.umbral < valor) {
      // Buscar la última notificación para este sensor
      const ultimaNotificacion = await Notificacion.findOne({
        where: { s_id },
        order: [['fecha', 'DESC']]
      });

      let enviarTelegrama = false;

      if (!ultimaNotificacion) {
        enviarTelegrama = true;
      } else {
        const fechaUltima = new Date(ultimaNotificacion.fecha);
        const diferenciaMs = now - fechaUltima;
        const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
        if (diferenciaHoras >= 1) {
          enviarTelegrama = true;
        }
      }

      // Crea la notificación en la base de datos
      await Notificacion.create({ s_id });

      if (enviarTelegrama) {
        const mensaje = `Sensor ${sensor.nombre} (${sensor.s_id}) ha rebasado el umbral de consumo: ${valor}`;
        enviarNotificacionIoT(mensaje);
      }
    }

    return true;
  } catch (error) {
    console.error("Error al crear medición:", error);
    return false;
  }
}

module.exports = {
  createMedicion,
    getLastMediciones,
    createMedicionFechaYHora,
  crearMedicionTCP
};0