module.exports = app => {
    const recepcionistas = require("../controllers/recepcionista.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo Recepcionista
    router.post("/", recepcionistas.create);
  
    // Obtener todos los Recepcionistas
    router.get("/", recepcionistas.findAll);
  
    // Obtener un Recepcionista por su IdRecepcionista
    router.get("/:IdRecepcionista", recepcionistas.findOne);
  
    // Actualizar un Recepcionista por su IdRecepcionista
    router.put("/:IdRecepcionista", recepcionistas.update);
  
    // Eliminar un Recepcionista por su IdRecepcionista
    router.delete("/:IdRecepcionista", recepcionistas.delete);
  
    app.use('/api/recepcionistas', router);
  };
  