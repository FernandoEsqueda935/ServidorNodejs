const { CreateDispositivoSinRegistrar } = require('../controladores/dispositivosController');

const d_id_to_esp = async () => {
  try {
    const dispositivo = await CreateDispositivoSinRegistrar();
    if (dispositivo) {
      console.log("Dispositivo creado sin registrar:", dispositivo);
      return dispositivo.d_id;
    } else {
      console.error("No se pudo crear el dispositivo sin registrar.");
      return null;
    }
  } catch (error) {
    console.error("Error al crear dispositivo sin registrar:", error);
    return null;
  }
};

module.exports = d_id_to_esp;