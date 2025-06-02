// middlewares/d_id_esp.js
module.exports = async (req, res, next) => {
    console.log("Enviando cmd al esp32");
    /*
    codigo middleware asegurandome que el esp respondio con ack y con el d_id asignado
    */
    next();
  };
  