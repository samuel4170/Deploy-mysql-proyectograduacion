const express = require("express");
const cors = require("cors");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:8080"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//const db = require("./app/models");
const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome samuel" });
});

// Rutas de Pacientes
require("./app/routers/paciente.routes")(app);
// Rutas de Medicos
require("./app/routers/medico.routes")(app);
// Rutas de Citas
require("./app/routers/cita.routes")(app);
// Rutas de Historial Medico
require("./app/routers/historialmedico.routes")(app);
// Rutas de Facturas
require("./app/routers/factura.routes")(app);
// Rutas de Recepcionistas
require("./app/routers/recepcionista.routes")(app);
// Rutas de Administradores
require("./app/routers/administrador.routes")(app);
// Rutas de horario
require("./app/routers/horario.routes")(app);
// Rutas de especialidades
require("./app/routers/especialidad.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


