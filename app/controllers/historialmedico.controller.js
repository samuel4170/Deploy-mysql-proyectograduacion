const db = require("../models");
const HistorialMedico = db.historiales;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo HistorialMedico
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.IdCita || !req.body.IdPaciente || !req.body.Diagnostico || !req.body.Tratamiento || !req.body.FechaHistorial) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear un HistorialMedico
  const historialMedico = {
    IdCita: req.body.IdCita,
    IdPaciente: req.body.IdPaciente,
    Diagnostico: req.body.Diagnostico,
    Tratamiento: req.body.Tratamiento,
    FechaHistorial: req.body.FechaHistorial
  };

  // Guardar el HistorialMedico en la base de datos
  HistorialMedico.create(historialMedico)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el HistorialMedico."
      });
    });
};

// Obtener todos los HistorialesMedicos de la base de datos
exports.findAll = (req, res) => {
  const idPaciente = req.query.IdPaciente;
  var condition = idPaciente ? { IdPaciente: idPaciente } : null;

  HistorialMedico.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar los HistorialesMedicos."
      });
    });
};

// Obtener un solo HistorialMedico por su id
exports.findOne = (req, res) => {
  const IdHistorial = req.params.IdHistorial;

  HistorialMedico.findByPk(IdHistorial)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar el HistorialMedico con IdHistorial=${IdHistorial}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el HistorialMedico con IdHistorial=" + IdHistorial
      });
    });
};

// Actualizar un HistorialMedico por su IdHistorial
exports.update = (req, res) => {
  const IdHistorial = req.params.IdHistorial;

  HistorialMedico.update(req.body, {
    where: { IdHistorial: IdHistorial }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El HistorialMedico se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el HistorialMedico con IdHistorial=${IdHistorial}. ¡Quizás no se encontró el HistorialMedico o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el HistorialMedico con IdHistorial=" + IdHistorial
      });
    });
};

// Eliminar un HistorialMedico por su IdHistorial
exports.delete = (req, res) => {
  const IdHistorial = req.params.IdHistorial;

  HistorialMedico.destroy({
    where: { IdHistorial: IdHistorial }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El HistorialMedico se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar el HistorialMedico con IdHistorial=${IdHistorial}. ¡Quizás el HistorialMedico no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el HistorialMedico con IdHistorial=" + IdHistorial
      });
    });
};

// Eliminar todos los HistorialesMedicos de la base de datos
exports.deleteAll = (req, res) => {
  HistorialMedico.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} HistorialesMedicos se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los HistorialesMedicos."
      });
    });
};
