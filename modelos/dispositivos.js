module.exports = (sequelize, DataTypes) => {
    const Dispositivo = sequelize.define('Dispositivo', {
      d_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING(50)
      },
      lugar: {
        type: DataTypes.STRING(50)
      }
    }, {
      tableName: 'dispositivos',
      timestamps: false
    });
  
    Dispositivo.associate = (models) => {
      Dispositivo.hasMany(models.Sensor, {
        foreignKey: 'd_id',
        as: 'sensores'
      });
    };
  
    return Dispositivo;
  };
  