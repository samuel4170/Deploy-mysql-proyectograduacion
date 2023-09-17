module.exports = app => {
    const especialidades = require("../controllers/especialidad.controller.js");
  
    var router = require("express").Router();
  
    // Crear una nueva Especialidad
    router.post("/", especialidades.create);
  
    // Obtener todas las Especialidades
    router.get("/", especialidades.findAll);
  
    // Obtener una Especialidad por su IdEspecialidad
    router.get("/:IdEspecialidad", especialidades.findOne);
  
    // Actualizar una Especialidad por su IdEspecialidad
    router.put("/:IdEspecialidad", especialidades.update);
  
    // Eliminar una Especialidad por su IdEspecialidad
    router.delete("/:IdEspecialidad", especialidades.delete);
  
    app.use('/api/especialidades', router);
  };
  