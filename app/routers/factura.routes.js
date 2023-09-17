module.exports = app => {
  const facturas = require("../controllers/factura.controller.js");

  var router = require("express").Router();

  // Crear una nueva Factura
  router.post("/", facturas.create);

  // Obtener todas las Facturas
  router.get("/", facturas.findAll);

  // Obtener una Factura por su IdFactura
  router.get("/:IdFactura", facturas.findOne);

  // Actualizar una Factura por su IdFactura
  router.put("/:IdFactura", facturas.update);

  // Eliminar una Factura por su IdFactura
  router.delete("/:IdFactura", facturas.delete);

  app.use('/api/facturas', router);
};
