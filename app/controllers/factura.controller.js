const db = require("../models");
const Factura = db.facturas;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva Factura
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.IdPaciente || !req.body.DPI || !req.body.IdMedico || !req.body.Especialidad || !req.body.LugarFecha || !req.body.ValorAPagar) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear una Factura
  const factura = {
    IdPaciente: req.body.IdPaciente,
    DPI: req.body.DPI,
    IdMedico: req.body.IdMedico,
    Especialidad: req.body.Especialidad,
    LugarFecha: req.body.LugarFecha,
    ValorAPagar: req.body.ValorAPagar
  };

  // Guardar la Factura en la base de datos
  Factura.create(factura)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear la Factura."
      });
    });
};

// Obtener todas las Facturas de la base de datos
exports.findAll = (req, res) => {
  const lugarFecha = req.query.LugarFecha;
  var condition = lugarFecha ? { LugarFecha: { [Op.like]: `%${lugarFecha}%` } } : null;

  Factura.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al recuperar las Facturas."
      });
    });
};

// Obtener una sola Factura por su id
exports.findOne = (req, res) => {
  const IdFactura = req.params.IdFactura;

  Factura.findByPk(IdFactura)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar la Factura con IdFactura=${IdFactura}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar la Factura con IdFactura=" + IdFactura
      });
    });
};

// Actualizar una Factura por su IdFactura
exports.update = (req, res) => {
  const IdFactura = req.params.IdFactura;

  Factura.update(req.body, {
    where: { IdFactura: IdFactura }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La Factura se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar la Factura con IdFactura=${IdFactura}. ¡Quizás no se encontró la Factura o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la Factura con IdFactura=" + IdFactura
      });
    });
};

// Eliminar una Factura por su IdFactura
exports.delete = (req, res) => {
  const IdFactura = req.params.IdFactura;

  Factura.destroy({
    where: { IdFactura: IdFactura }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡La Factura se eliminó correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar la Factura con IdFactura=${IdFactura}. ¡Quizás la Factura no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la Factura con IdFactura=" + IdFactura
      });
    });
};

// Eliminar todas las Facturas de la base de datos
exports.deleteAll = (req, res) => {
  Factura.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Facturas se eliminaron correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todas las Facturas."
      });
    });
};
