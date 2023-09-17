require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/db"); // Ruta corregida para importar sequelize
const app = express();

const { PORT } = require("./src/config"); // Ruta corregida para importar la configuración

//dep
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa los modelos y sincroniza la base de datos
const db = require("./src/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Fallo al conectar a la db: " + err.message);
  });

// Rutas de Pacientes
require("./src/routers/paciente.routes")(app);
// Rutas de Medicos
require("./src/routers/medico.routes")(app);
// Rutas de Citas
require("./src/routers/cita.routes")(app);
// Rutas de Historial Medico
require("./src/routers/historialmedico.routes")(app);
// Rutas de Facturas
require("./src/routers/factura.routes")(app);
// Rutas de Recepcionistas
require("./src/routers/recepcionista.routes")(app);
// Rutas de Administradores
require("./src/routers/administrador.routes")(app);
// Rutas de horario
require("./src/routers/horario.routes")(app);
// Rutas de especialidades
require("./src/routers/especialidad.routes")(app);

// Establece el puerto y escucha las solicitudes
app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}.`);
});
