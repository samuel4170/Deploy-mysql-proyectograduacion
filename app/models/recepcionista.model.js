module.exports = (sequelize, Sequelize) => {
  const Recepcionista = sequelize.define("recepcionista", {
    IdRecepcionista: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    Telefono: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    Usuario: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    Password: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  });

  return Recepcionista;
};
