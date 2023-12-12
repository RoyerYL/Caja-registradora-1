require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST ,DB_PORT,DB_BDD } = process.env;
const ArticuloFunction=require('./models/Articulo')
const CategoriaFunction=require('./models/Categoria')
const ProvedorFunction=require('./models/Provedor')
const ClienteFunction = require('./models/Cliente');
const TicketFunction=require('./models/Ticket');
const CompraFunction=require('./models/Compra');

// /**
//  * Conexion con la base de datos
//  */
// const dataBase = new Sequelize(
//    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BDD}`,
//    { logging: false, native: false }
// );

// /***
//  * Creacion de tablas
//  */
// ArticuloFunction(dataBase)
// CategoriaFunction(dataBase)
// FabricanteFunction(dataBase)
// ProvedorFunction(dataBase)

// /**
//  * Tablas
//  */
// const {Articulo,Provedor,Categoria,Fabricante} =dataBase.models


// Categoria.hasMany(Articulo);
// Articulo.belongsTo(Categoria);

// Fabricante.hasMany(Articulo);
// Articulo.belongsTo(Fabricante);

// Provedor.hasMany(Articulo);
// Articulo.belongsTo(Provedor);



// module.exports = {
//    Articulo,
//    // Favorite,
//    dataBase,
// };

const dataBase=new Sequelize({
   dialect:'sqlite',
   storage:'./tienda.sqlite',
   database:"tienda"
})

ArticuloFunction(dataBase)
CategoriaFunction(dataBase)
ProvedorFunction(dataBase)

ClienteFunction(dataBase)
TicketFunction(dataBase)
CompraFunction(dataBase)
// Creación de tablas
const { Articulo, Provedor, Categoria,Cliente,Ticket,Compra } = dataBase.models;

Categoria.hasMany(Articulo, { foreignKey: 'CategoriaId' });
Articulo.belongsTo(Categoria, { foreignKey: 'CategoriaId' });

Provedor.hasMany(Articulo, { foreignKey: 'ProvedorId' });
Articulo.belongsTo(Provedor, { foreignKey: 'ProvedorId' });

Cliente.hasMany(Ticket)
Ticket.belongsTo(Cliente)

Ticket.hasMany(Compra)
Compra.belongsTo(Ticket)

Articulo.hasMany(Compra,{foreignKey:"ArticuloId"})
Compra.belongsTo(Articulo,{foreignKey:"ArticuloId"})



module.exports = {
  dataBase,
  Articulo,
  Provedor,
  Categoria,
  Compra,
  Ticket,
  Cliente
};