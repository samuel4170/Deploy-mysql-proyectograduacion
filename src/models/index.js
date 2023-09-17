const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    DB_HOST: dbConfig.DB_HOST,
    DB_PORT: dbConfig.DB_PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
    //sa
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.horarios = require("./horario.model.js")(sequelize, Sequelize);
db.administradores = require("./administrador.model.js")(sequelize, Sequelize);
db.citas = require("./cita.model.js")(sequelize, Sequelize);
db.facturas = require("./factura.model.js")(sequelize, Sequelize);
db.historiales = require("./historialmedico.model.js")(sequelize, Sequelize);
db.medicos = require("./medico.model.js")(sequelize, Sequelize);
db.pacientes = require("./paciente.model.js")(sequelize, Sequelize);
db.recepcionistas = require("./recepcionista.model.js")(sequelize, Sequelize);
db.especialidades = require("./especialidad.model.js")(sequelize, Sequelize); // Agregamos el modelo de Especialidad

db.pacientes.hasMany(db.citas, { foreignKey: "IdPaciente" });
db.citas.belongsTo(db.pacientes, { foreignKey: "IdPaciente" });

// Relación uno a muchos: Médico - Citas
db.medicos.hasMany(db.citas, { foreignKey: "IdMedico" });
db.citas.belongsTo(db.medicos, { foreignKey: "IdMedico" });

// Relación uno a muchos: Recepcionista - Citas
db.recepcionistas.hasMany(db.citas, { foreignKey: "IdRecepcionista" });
db.citas.belongsTo(db.recepcionistas, { foreignKey: "IdRecepcionista" });

// Relación uno a muchos: Administrador - Recepcionistas
db.administradores.hasMany(db.recepcionistas, { foreignKey: "IdAdministrador" });
db.recepcionistas.belongsTo(db.administradores, { foreignKey: "IdAdministrador" });

// Relación uno a muchos: Especialidad - Médicos
db.especialidades.hasMany(db.medicos, { foreignKey: "IdEspecialidad" });
db.medicos.belongsTo(db.especialidades, { foreignKey: "IdEspecialidad" });

// Relación uno a uno: Cita - Factura
db.citas.hasOne(db.facturas, { foreignKey: "IdCita" });
db.facturas.belongsTo(db.citas, { foreignKey: "IdCita" });

// Relación uno a muchos: Paciente - Historiales Médicos
db.pacientes.hasMany(db.historiales, { foreignKey: "IdPaciente" });

// Relación uno a uno: Cita - Horario
db.citas.belongsTo(db.horarios, { foreignKey: "IdHorario" });

// Relación uno a uno: Cita - Médico
db.citas.belongsTo(db.medicos, { foreignKey: "IdMedico" });

//relacion cita a especialidad
db.citas.belongsTo(db.especialidades, { foreignKey: "IdEspecialidad" }); 

module.exports = db;
