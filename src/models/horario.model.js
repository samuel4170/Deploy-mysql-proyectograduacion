
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
        // Obtener el valor almacenado
        const rawValue = this.getDataValue('HoraInicio');

        // Verificar que el valor no sea nulo y que sea una cadena de tiempo válida
        if (rawValue) {
          return formatTime(rawValue);
        }

        return null; // Devolver nulo si el valor no es válido
      },
    },
    HoraFin: {
      type: DataTypes.TIME,
      allowNull: false,
      get() {
        // Obtener el valor almacenado
        const rawValue = this.getDataValue('HoraFin');

        // Verificar que el valor no sea nulo y que sea una cadena de tiempo válida
        if (rawValue) {
          return formatTime(rawValue);
        }

        return null; // Devolver nulo si el valor no es válido
      },
    }
  });

  return Horario;
};

// Función auxiliar para formatear el tiempo en "HH:MM:SS"
function formatTime(rawValue) {
  const timeComponents = rawValue.split(':');
  if (timeComponents.length === 3) {
    const hour = parseInt(timeComponents[0], 10);
    const minute = parseInt(timeComponents[1], 10);
    const second = parseInt(timeComponents[2], 10);

    // Verificar que los componentes de tiempo sean válidos
    if (!isNaN(hour) && !isNaN(minute) && !isNaN(second)) {
      return `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
    }
  }
  return null; // Devolver nulo si el valor no es válido
}

// Función auxiliar para agregar ceros a la izquierda si es necesario
function padZero(value) {
  return value.toString().padStart(2, '0');
}
