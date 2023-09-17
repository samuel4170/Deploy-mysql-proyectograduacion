module.exports = app => {
  const medicos = require("../controllers/medico.controller.js");

  var router = require("express").Router();

  // Crear un nuevo Medico
  router.post("/", medicos.create);

  // Obtener todos los Medicos
  router.get("/", medicos.findAll);

  // Obtener un Medico por su IdMedico
  router.get("/:IdMedico", medicos.findOne);

  // Actualizar un Medico por su IdMedico
  router.put("/:IdMedico", medicos.update);

  // Eliminar un Medico por su IdMedico
  router.delete("/:IdMedico", medicos.delete);

  app.use('/api/medicos', router);
};
