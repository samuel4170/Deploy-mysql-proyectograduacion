const db = require("../models");
const Especialidad = db.especialidades;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva Especialidad
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.Nombre) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear una Especialidad
  const especialidad = {
    Nombre: req.body.Nombre
  };

  // Guardar la Especialidad en la base de datos
  Especialidad.create(especialidad)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear la Especialidad."
      });
    });
};

// Obtener todas las Especialidades de la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.Nombre;
  var condition = nombre ? { Nombre: { [Op.like]: `%${nombre}%` } } : null;

  Especialidad.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar las Especialidades."
      });
    });
};

// Obtener una sola Especialidad por su id
exports.findOne = (req, res) => {
  const IdEspecialidad = req.params.IdEspecialidad;

  Especialidad.findByPk(IdEspecialidad)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar la Especialidad con IdEspecialidad=${IdEspecialidad}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar la Especialidad con IdEspecialidad=" + IdEspecialidad
      });
    });
};

// Actualizar una Especialidad por su IdEspecialidad
exports.update = (req, res) => {
  const IdEspecialidad = req.params.IdEspecialidad;

  Especialidad.update(req.body, {
    where: { IdEspecialidad: IdEspecialidad }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La Especialidad se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar la Especialidad con IdEspecialidad=${IdEspecialidad}. ¡Quizás no se encontró la Especialidad o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la Especialidad con IdEspecialidad=" + IdEspecialidad
      });
    });
};

// Eliminar una Especialidad por su IdEspecialidad
exports.delete = (req, res) => {
  const IdEspecialidad = req.params.IdEspecialidad;

  Especialidad.destroy({
    where: { IdEspecialidad: IdEspecialidad }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡La Especialidad se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar la Especialidad con IdEspecialidad=${IdEspecialidad}. ¡Quizás la Especialidad no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la Especialidad con IdEspecialidad=" + IdEspecialidad
      });
    });
};

// Eliminar todas las Especialidades de la base de datos
exports.deleteAll = (req, res) => {
  Especialidad.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Especialidades se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todas las Especialidades."
      });
    });
};
