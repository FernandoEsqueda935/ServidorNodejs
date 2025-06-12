// models/sensor.js
module.exports = (sequelize, DataTypes) => {
    const Sensor = sequelize.define('Sensor', {
      s_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      d_id: {
        type: DataTypes.INTEGER
      },
      lugar: {
        type: DataTypes.STRING(50)
      },
      tipo: {
        type: DataTypes.STRING(20)
      },
      nombre: {
        type: DataTypes.STRING(50)
      },
      slot: {
        type: DataTypes.INTEGER
      },
      offset : {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      umbral: {
        type: DataTypes.INTEGER,
        defaultValue: 100000
      }
    }, {
      tableName: 'sensores',
      timestamps: false
    });
  
    Sensor.associate = (models) => {
      Sensor.belongsTo(models.Dispositivo, {
        foreignKey: 'd_id',
        as: 'dispositivo'
      });
      Sensor.hasMany(models.Medicion, {
        foreignKey: 's_id',
        as: 'mediciones'
      });
    };
  
    return Sensor;
  };
  