module.exports = app => {
  const citas = require("../controllers/cita.controller.js");

  var router = require("express").Router();

  // Crear una nueva Cita
  router.post("/", citas.create);

  // Obtener todas las Citas
  router.get("/", citas.findAll);

  // Obtener una Cita por su IdCita
  router.get("/:IdCita", citas.findOne);

  // Actualizar una Cita por su IdCita
  router.put("/:IdCita", citas.update);

  // Eliminar una Cita por su IdCita
  router.delete("/:IdCita", citas.delete);

  app.use('/api/citas', router);
};
