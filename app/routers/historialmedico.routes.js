module.exports = app => {
  const historiales = require("../controllers/historialmedico.controller.js");

  var router = require("express").Router();

  // Crear un nuevo HistorialMedico
  router.post("/", historiales.create);

  // Obtener todos los HistorialesMedicos
  router.get("/", historiales.findAll);

  // Obtener un HistorialMedico por su IdHistorial
  router.get("/:IdHistorial", historiales.findOne);

  // Actualizar un HistorialMedico por su IdHistorial
  router.put("/:IdHistorial", historiales.update);

  // Eliminar un HistorialMedico por su IdHistorial
  router.delete("/:IdHistorial", historiales.delete);

  app.use('/api/historialmedico', router);
};
