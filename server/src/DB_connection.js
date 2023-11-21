require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST ,DB_PORT,DB_BDD } = process.env;
const ArticuloFunction=require('./models/Articulo')

const dataBase = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BDD}`,
   { logging: false, native: false }
);

ArticuloFunction(dataBase)

const {Articulo} =dataBase.models
// const { User, Favorite } = dataBase.models;

// User.belongsToMany(Favorite,{through:"user_favorite"})
// Favorite.belongsToMany(User,{through:"user_favorite"})

module.exports = {
   Articulo,
   // Favorite,
   dataBase,
};
