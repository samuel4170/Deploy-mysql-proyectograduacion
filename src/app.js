require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("../src/db");
const app = express();

const { PORT } = require("../src/config.js");

// var corsOptions = {
//   origin: "http://localhost:8080"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//const db = require("./app/models");
const db = require(".//models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Fallo al conectar a la db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome samuel" });
});

// Rutas de Pacientes
require(".//routers/paciente.routes")(app);
// Rutas de Medicos
require(".//routers/medico.routes")(app);
// Rutas de Citas
require(".//routers/cita.routes")(app);
// Rutas de Historial Medico
require(".//routers/historialmedico.routes")(app);
// Rutas de Facturas
require(".//routers/factura.routes")(app);
// Rutas de Recepcionistas
require(".//routers/recepcionista.routes")(app);
// Rutas de Administradores
require(".//routers/administrador.routes")(app);
// Rutas de horario
require(".//routers/horario.routes")(app);
// Rutas de especialidades
require(".//routers/especialidad.routes")(app);


// set port, listen for requests
app.listen(8080 || process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


