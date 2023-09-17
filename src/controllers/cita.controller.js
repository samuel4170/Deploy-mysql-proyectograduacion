const db = require("../models");
const Cita = db.citas;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva Cita
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.FechaCita || !req.body.IdHorario || !req.body.IdEspecialidad || !req.body.IdPaciente || !req.body.IdMedico || !req.body.IdRecepcionista) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear una Cita
  const cita = {
    FechaCita: req.body.FechaCita,
    Mensaje: req.body.Mensaje || null,
    IdHorario: req.body.IdHorario,
    IdPaciente: req.body.IdPaciente,
    IdMedico: req.body.IdMedico,
    IdRecepcionista: req.body.IdRecepcionista,
    IdEspecialidad: req.body.IdEspecialidad
  };

  // Guardar la Cita en la base de datos
  Cita.create(cita)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear la Cita."
      });
    });
};

// Obtener todas las Citas de la base de datos
exports.findAll = (req, res) => {
  const FechaCita = req.query.FechaCita;
  var condition = FechaCita ? { FechaCita: { [Op.like]: `%${FechaCita}%` } } : null;

  Cita.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar las Citas."
      });
    });
};

// Obtener una sola Cita por su id
exports.findOne = (req, res) => {
  const IdCita = req.params.IdCita;

  Cita.findByPk(IdCita)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar la Cita con IdCita=${IdCita}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar la Cita con IdCita=" + IdCita
      });
    });
};

// Actualizar una Cita por su IdCita
exports.update = (req, res) => {
  const IdCita = req.params.IdCita;

  Cita.update(req.body, {
    where: { IdCita: IdCita }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La Cita se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar la Cita con IdCita=${IdCita}. ¡Quizás no se encontró la Cita o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la Cita con IdCita=" + IdCita
      });
    });
};

// Eliminar una Cita por su IdCita
exports.delete = (req, res) => {
  const IdCita = req.params.IdCita;

  Cita.destroy({
    where: { IdCita: IdCita }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡La Cita se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar la Cita con IdCita=${IdCita}. ¡Quizás la Cita no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la Cita con IdCita=" + IdCita
      });
    });
};

// Eliminar todas las Citas de la base de datos
exports.deleteAll = (req, res) => {
  Cita.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Citas se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todas las Citas."
      });
    });
};
