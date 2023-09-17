const { config } = require('dotenv');

config()

module.exports = {
    PORT: process.env.PORT || 8080,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "1234",
    DB_DATABASE: process.env.DB_DATABASE || "Clinica",
    DB_PORT: process.env.DB_PORT || 3306,
};



