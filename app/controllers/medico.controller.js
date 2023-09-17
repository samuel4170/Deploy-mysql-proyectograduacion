const db = require("../models");
const Medico = db.medicos;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Medico
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.Nombre || !req.body.Direccion || !req.body.Telefono || !req.body.NIT || !req.body.DPI || !req.body.IdEspecialidad
    ) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear un Medico
  const medico = {
    Nombre: req.body.Nombre,
    Direccion: req.body.Direccion,
    Telefono: req.body.Telefono,
    NIT: req.body.NIT,
    DPI: req.body.DPI,
    IdEspecialidad: req.body.IdEspecialidad,
    IdDia: req.body.IdDia
  };

  // Guardar el Medico en la base de datos
  Medico.create(medico)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el Medico."
      });
    });
};

// Obtener todos los Medicos de la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.Nombre;
  var condition = nombre ? { Nombre: { [Op.like]: `%${nombre}%` } } : null;

  Medico.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar los Medicos."
      });
    });
};

// Obtener un solo Medico por su id
exports.findOne = (req, res) => {
  const IdMedico = req.params.IdMedico;

  Medico.findByPk(IdMedico)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar el Medico con IdMedico=${IdMedico}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el Medico con IdMedico=" + IdMedico
      });
    });
};

// Actualizar un Medico por su IdMedico
exports.update = (req, res) => {
  const IdMedico = req.params.IdMedico;

  Medico.update(req.body, {
    where: { IdMedico: IdMedico }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El Medico se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el Medico con IdMedico=${IdMedico}. ¡Quizás no se encontró el Medico o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Medico con IdMedico=" + IdMedico
      });
    });
};

// Eliminar un Medico por su IdMedico
exports.delete = (req, res) => {
  const IdMedico = req.params.IdMedico;

  Medico.destroy({
    where: { IdMedico: IdMedico }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Medico se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar el Medico con IdMedico=${IdMedico}. ¡Quizás el Medico no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Medico con IdMedico=" + IdMedico
      });
    });
};

// Eliminar todos los Medicos de la base de datos
exports.deleteAll = (req, res) => {
  Medico.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Medicos se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los Medicos."
      });
    });
};
