module.exports = (sequelize, Sequelize) => {
    const Especialidad = sequelize.define("especialidad", {
      IdEspecialidad: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
  
    return Especialidad;
  };
  