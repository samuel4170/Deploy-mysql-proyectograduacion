require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "Clinica",
  port: process.env.DB_PORT || 3306,
  dialect: "mysql", // Agrega esta línea
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
