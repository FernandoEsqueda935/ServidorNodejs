const { getID } = require('../tcp_server/tcpServer');


const getIdFromESP = (req, res) => {
  try {
    const d_id = getID();
    if (d_id) {
      return res.status(200).json({ d_id });
    } else {
      return res.status(404).json({ error: "No se encontró un d_id disponible." });
    }
  } catch (error) {
    console.error("Error al obtener el d_id:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

module.exports = {
  getIdFromESP
};