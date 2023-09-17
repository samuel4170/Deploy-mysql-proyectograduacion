const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Horario = sequelize.define("horario", {
      IdHorario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      HoraInicio: {
        type: DataTypes.TIME,
        allowNull: false,
        get() {
          // Obtener solo la hora de la fecha almacenada
          const rawValue = this.getDataValue('HoraInicio');
          return rawValue ? rawValue.toISOString().slice(11, 19) : null;
        },
      },
      HoraFin: {
        type: DataTypes.TIME,
        allowNull: false,
        get() {
          // Obtener solo la hora de la fecha almacenada
          const rawValue = this.getDataValue('HoraFin');
          return rawValue ? rawValue.toISOString().slice(11, 19) : null;
        },
      }
      
    });
  
    return Horario;
  };
  