module.exports = app => {
    const horarios = require("../controllers/horario.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo Horario
    router.post("/", horarios.create);
  
    // Obtener todos los Horarios
    router.get("/", horarios.findAll);
  
    // Obtener un Horario por su IdHorario
    router.get("/:IdHorario", horarios.findOne);
  
    // Actualizar un Horario por su IdHorario
    router.put("/:IdHorario", horarios.update);
  
    // Eliminar un Horario por su IdHorario
    router.delete("/:IdHorario", horarios.delete);
  
    app.use('/api/horarios', router);
  };
  