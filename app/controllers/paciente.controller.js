const db = require("../models");
const Paciente = db.pacientes;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Paciente
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.Nombre || !req.body.Direccion || !req.body.Telefono || !req.body.DPI || !req.body.Edad) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }
  
  // Crear un Paciente
  const paciente = {
    Nombre: req.body.Nombre,
    Direccion: req.body.Direccion,
    Telefono: req.body.Telefono,
    DPI: req.body.DPI,
    Edad: req.body.Edad,
    DPIReferencia: req.body.DPIReferencia || null
  };

  // Guardar el Paciente en la base de datos
  Paciente.create(paciente)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el Paciente."
      });
    });
};

// Obtener todos los Pacientes de la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.Nombre;
  var condition = nombre ? { Nombre: { [Op.like]: `%${nombre}%` } } : null;

  Paciente.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar los Pacientes."
      });
    });
};

// Obtener un solo Paciente por su id
exports.findOne = (req, res) => {
  const IdPaciente = req.params.IdPaciente;

  Paciente.findByPk(IdPaciente)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar el Paciente con IdPaciente=${IdPaciente}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el Paciente con IdPaciente=" + IdPaciente
      });
    });
};

// Actualizar un Paciente por su IdPaciente
exports.update = (req, res) => {
  const IdPaciente = req.params.IdPaciente;

  Paciente.update(req.body, {
    where: { IdPaciente: IdPaciente }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El Paciente se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el Paciente con IdPaciente=${IdPaciente}. ¡Quizás no se encontró el Paciente o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Paciente con IdPaciente=" + IdPaciente
      });
    });
};

// Eliminar un Paciente por su IdPaciente
exports.delete = (req, res) => {
  const IdPaciente = req.params.IdPaciente;

  Paciente.destroy({
    where: { IdPaciente: IdPaciente }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Paciente se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar el Paciente con IdPaciente=${IdPaciente}. ¡Quizás el Paciente no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Paciente con IdPaciente=" + IdPaciente
      });
    });
};

// Eliminar todos los Pacientes de la base de datos
exports.deleteAll = (req, res) => {
  Paciente.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Pacientes se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los Pacientes."
      });
    });
};
