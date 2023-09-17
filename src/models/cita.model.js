module.exports = (sequelize, Sequelize) => {
  const Cita = sequelize.define("cita", {
    IdCita: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FechaCita: {
      type: Sequelize.DATE,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('FechaCita');
        if (!rawValue) return null;
  
        const formattedDate = rawValue.toISOString().split('T')[0];
        return formattedDate;
      }
    },
    Mensaje: {
      type: Sequelize.STRING(200)
    }
  });

  return Cita;
};
