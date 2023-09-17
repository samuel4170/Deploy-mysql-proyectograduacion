module.exports = (sequelize, Sequelize) => {
  const Factura = sequelize.define("factura", {
    IdFactura: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    DPI: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    LugarFecha: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    ValorPagar: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    }
  });

  return Factura;
};
