module.exports = (sequelize, DataTypes) => {
  const Notificacion = sequelize.define('Notificacion', {
    n_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    s_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sensores', // nombre de la tabla referenciada
        key: 's_id'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'notificacion',
    timestamps: false
  });

  Notificacion.associate = function(models) {
    Notificacion.belongsTo(models.Sensor, { foreignKey: 's_id', targetKey: 's_id' });
  };

  return Notificacion;
};