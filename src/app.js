require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./models"); // Ruta corregida para importar sequelize
const app = express();

const { PORT } = require("./config/db.config"); // Ruta corregida para importar la configuración


//dep
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa los modelos y sincroniza la base de datos
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Fallo al conectar a la db: " + err.message);
  });

// Rutas de Pacientes
require("./routers/paciente.routes")(app);
// Rutas de Medicos
require("./routers/medico.routes")(app);
// Rutas de Citas
require("./routers/cita.routes")(app);
// Rutas de Historial Medico
require("./routers/historialmedico.routes")(app);
// Rutas de Recepcionistas
require("./routers/recepcionista.routes")(app);
// Rutas de Administradores
require("./routers/administrador.routes")(app);
// Rutas de horario
require("./routers/horario.routes")(app);
// Rutas de especialidades
require("./routers/especialidad.routes")(app);

// Establece el puerto y escucha las solicitudes
app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}.`);
});
