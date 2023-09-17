require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

module.exports = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "1234",
  DB_DATABASE: process.env.DB_DATABASE || "Clinica",
  DB_PORT: process.env.DB_PORT || 3306, // El puerto predeterminado de MySQL es 3306
  dialect: "mysql", // Cambiar el dialecto de mssql a mysql
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
};
