  module.exports = app => {
    const pacientes = require("../controllers/paciente.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo Paciente
    router.post("/", pacientes.create);
  
    // Obtener todos los Pacientes
    router.get("/", pacientes.findAll);
  
    // Obtener un Paciente por su IdPaciente
    router.get("/:IdPaciente", pacientes.findOne);
  
    // Actualizar un Paciente por su IdPaciente
    router.put("/:IdPaciente", pacientes.update);
  
    // Eliminar un Paciente por su IdPaciente
    router.delete("/:IdPaciente", pacientes.delete);
  
    app.use('/api/pacientes', router);
  };
  