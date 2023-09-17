module.exports = (sequelize, Sequelize) => {
  const Paciente = sequelize.define("paciente", {
    IdPaciente: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    Direccion: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    Telefono: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    DPI: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    Edad: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    DPIReferencia: {
      type: Sequelize.STRING(20)
    }
  }); 

  return Paciente;
};
