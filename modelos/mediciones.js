// models/medicion.js
module.exports = (sequelize, DataTypes) => {
    const Medicion = sequelize.define('Medicion', {
      m_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      s_id: {
        type: DataTypes.INTEGER
      },
      valor: {
        type: DataTypes.INTEGER
      },
      fecha: {
        type: DataTypes.DATEONLY
      },
      hora: {
        type: DataTypes.TIME
      }
    }, {
      tableName: 'mediciones',
      timestamps: false
    });
  
    Medicion.associate = (models) => {
      Medicion.belongsTo(models.Sensor, {
        foreignKey: 's_id',
        as: 'sensor'
      });
    };
  
    return Medicion;
  };
  