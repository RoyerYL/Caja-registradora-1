require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST ,DB_PORT,DB_BDD } = process.env;
const ArticuloFunction=require('./models/Articulo')
const CategoriaFunction=require('./models/Categoria')
const FabricanteFunction=require('./models/Fabricante')
const ProvedorFunction=require('./models/Provedor')


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
CategoriaFunction(dataBase)
FabricanteFunction(dataBase)
ProvedorFunction(dataBase)

/**
 * Tablas
 */
const {Articulo,Provedor,Categoria,Fabricante} =dataBase.models


Categoria.hasMany(Articulo);
Articulo.belongsTo(Categoria);

Fabricante.hasMany(Articulo);
Articulo.belongsTo(Fabricante);

Provedor.hasMany(Articulo);
Articulo.belongsTo(Provedor);



module.exports = {
   Articulo,
   // Favorite,
   dataBase,
};
