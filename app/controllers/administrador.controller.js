const db = require("../models");
const Administrador = db.administradores;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Administrador
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.Nombre || !req.body.Telefono || !req.body.Usuario || !req.body.Password) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear un Administrador
  const administrador = {
    Nombre: req.body.Nombre,
    Telefono: req.body.Telefono,
    Usuario: req.body.Usuario,
    Password: req.body.Password
  };

  // Guardar el Administrador en la base de datos
  Administrador.create(administrador)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el Administrador."
      });
    });
};

// Obtener todos los Administradores de la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.Nombre;
  var condition = nombre ? { Nombre: { [Op.like]: `%${nombre}%` } } : null;

  Administrador.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar los Administradores."
      });
    });
};

// Obtener un solo Administrador por su id
exports.findOne = (req, res) => {
  const IdAdministrador = req.params.IdAdministrador;

  Administrador.findByPk(IdAdministrador)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar el Administrador con IdAdministrador=${IdAdministrador}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el Administrador con IdAdministrador=" + IdAdministrador
      });
    });
};

// Actualizar un Administrador por su IdAdministrador
exports.update = (req, res) => {
  const IdAdministrador = req.params.IdAdministrador;

  Administrador.update(req.body, {
    where: { IdAdministrador: IdAdministrador }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El Administrador se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el Administrador con IdAdministrador=${IdAdministrador}. ¡Quizás no se encontró el Administrador o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Administrador con IdAdministrador=" + IdAdministrador
      });
    });
};

// Eliminar un Administrador por su IdAdministrador
exports.delete = (req, res) => {
  const IdAdministrador = req.params.IdAdministrador;

  Administrador.destroy({
    where: { IdAdministrador: IdAdministrador }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El Administrador se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar el Administrador con IdAdministrador=${IdAdministrador}. ¡Quizás el Administrador no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Administrador con IdAdministrador=" + IdAdministrador
      });
    });
};

// Eliminar todos los Administradores de la base de datos
exports.deleteAll = (req, res) => {
  Administrador.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Administradores se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los Administradores."
      });
    });
};
