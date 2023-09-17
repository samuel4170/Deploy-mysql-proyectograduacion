const db = require("../models");
const Horario = db.horarios;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Horario
exports.create = (req, res) => {
  // Validar la solicitud
  if ( !req.body.HoraInicio || !req.body.HoraFin ) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear un Horario
  const horario = {
    HoraInicio: req.body.HoraInicio,
    HoraFin: req.body.HoraFin,
  };

  // Guardar el Horario en la base de datos
  Horario.create(horario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el Horario."
      });
    });
};

// Obtener todos los Horarios de la base de datos
exports.findAll = (req, res) => {
  const HoraInicio = req.query.HoraInicio;
  var condition = HoraInicio ? { HoraInicio: HoraInicio } : null;

  Horario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar los Horarios."
      });
    });
};

// Obtener un solo Horario por su id
exports.findOne = (req, res) => {
  const IdHorario = req.params.IdHorario;

  Horario.findByPk(IdHorario)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar el Horario con IdHorario=${IdHorario}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el Horario con IdHorario=" + IdHorario
      });
    });
};

// Actualizar un Horario por su IdHorario
exports.update = (req, res) => {
  const IdHorario = req.params.IdHorario;

  Horario.update(req.body, {
    where: { IdHorario: IdHorario }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El Horario se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el Horario con IdHorario=${IdHorario}. ¡Quizás no se encontró el Horario o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Horario con IdHorario=" + IdHorario
      });
    });
};

// Eliminar un Horario por su IdHorario
exports.delete = (req, res) => {
  const IdHorario = req.params.IdHorario;

  Horario.destroy({
    where: { IdHorario: IdHorario }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Horario se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar el Horario con IdHorario=${IdHorario}. ¡Quizás el Horario no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Horario con IdHorario=" + IdHorario
      });
    });
};

// Eliminar todos los Horarios de la base de datos
exports.deleteAll = (req, res) => {
  Horario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Horarios se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los Horarios."
      });
    });
};
