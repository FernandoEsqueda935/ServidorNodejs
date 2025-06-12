const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../configuraciones/db'); // Asegúrate de que la ruta sea correcta
const Dispositivo = require('./dispositivos')(sequelize, DataTypes);
const Sensor = require('./sensores')(sequelize, DataTypes);
const Medicion = require('./mediciones')(sequelize, DataTypes);
const Notificacion = require('./notificacion')(sequelize, DataTypes);

// Asociaciones (si las tienes)
Dispositivo.associate?.({ Sensor });
Sensor.associate?.({ Dispositivo, Medicion });
Medicion.associate?.({ Sensor });

module.exports = {
  sequelize,
  Sequelize,
  Dispositivo,
  Sensor,
  Medicion,
  Notificacion
};
