module.exports = app => {
  const administradores = require("../controllers/administrador.controller.js");

  var router = require("express").Router();

  // Crear un nuevo Administrador
  router.post("/", administradores.create);

  // Obtener todos los Administradores
  router.get("/", administradores.findAll);

  // Obtener un Administrador por su IdAdministrador
  router.get("/:IdAdministrador", administradores.findOne);

  // Actualizar un Administrador por su IdAdministrador
  router.put("/:IdAdministrador", administradores.update);

  // Eliminar un Administrador por su IdAdministrador
  router.delete("/:IdAdministrador", administradores.delete);

  app.use('/api/administradores', router);
};
