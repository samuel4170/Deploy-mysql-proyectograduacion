module.exports = (sequelize, Sequelize) => {
  const Medico = sequelize.define("medico", {
    IdMedico: {
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
    NIT: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    DPI: {
      type: Sequelize.STRING(20),
      allowNull: false
    }
  });

  return Medico;
};
