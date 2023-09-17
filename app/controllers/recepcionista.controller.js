const db = require("../models");
const Recepcionista = db.recepcionistas;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Recepcionista
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.Nombre || !req.body.Usuario || !req.body.Telefono || !req.body.Password || !req.body.IdAdministrador) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear un Recepcionista
  const recepcionista = {
    Nombre: req.body.Nombre,
    Telefono: req.body.Telefono,
    Usuario: req.body.Usuario,
    Password: req.body.Password,
    IdAdministrador: req.body.IdAdministrador
  };

  // Guardar el Recepcionista en la base de datos
  Recepcionista.create(recepcionista)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el Recepcionista."
      });
    });
};

// Obtener todos los Recepcionistas de la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.Nombre;
  var condition = nombre ? { Nombre: { [Op.like]: `%${nombre}%` } } : null;

  Recepcionista.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar los Recepcionistas."
      });
    });
};

// Obtener un solo Recepcionista por su id
exports.findOne = (req, res) => {
  const IdRecepcionista = req.params.IdRecepcionista;

  Recepcionista.findByPk(IdRecepcionista)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar el Recepcionista con IdRecepcionista=${IdRecepcionista}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el Recepcionista con IdRecepcionista=" + IdRecepcionista
      });
    });
};

// Actualizar un Recepcionista por su IdRecepcionista
exports.update = (req, res) => {
  const IdRecepcionista = req.params.IdRecepcionista;

  Recepcionista.update(req.body, {
    where: { IdRecepcionista: IdRecepcionista }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El Recepcionista se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el Recepcionista con IdRecepcionista=${IdRecepcionista}. ¡Quizás no se encontró el Recepcionista o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Recepcionista con IdRecepcionista=" + IdRecepcionista
      });
    });
};

// Eliminar un Recepcionista por su IdRecepcionista
exports.delete = (req, res) => {
  const IdRecepcionista = req.params.IdRecepcionista;

  Recepcionista.destroy({
    where: { IdRecepcionista: IdRecepcionista }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Recepcionista se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar el Recepcionista con IdRecepcionista=${IdRecepcionista}. ¡Quizás el Recepcionista no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Recepcionista con IdRecepcionista=" + IdRecepcionista
      });
    });
};

// Eliminar todos los Recepcionistas de la base de datos
exports.deleteAll = (req, res) => {
  Recepcionista.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Recepcionistas se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los Recepcionistas."
      });
    });
};
