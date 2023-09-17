module.exports = (sequelize, Sequelize) => {
  const HistorialMedico = sequelize.define("historialmedico", {
    IdHistorial: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Diagnostico: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    Tratamiento: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    FechaHistorial: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  return HistorialMedico;
};
