require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST ,DB_PORT,DB_BDD } = process.env;
const ArticuloFunction=require('./models/Articulo')


/**
 * Conexion con la base de datos
 */
const dataBase = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BDD}`,
   { logging: false, native: false }
);

/***
 * Creacion de tablas
 */
ArticuloFunction(dataBase)

/**
 * Tablas
 */
const {Articulo} =dataBase.models


module.exports = {
   Articulo,
   // Favorite,
   dataBase,
};
