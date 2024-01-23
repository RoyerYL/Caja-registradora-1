const { Sequelize } = require('sequelize');
const ArticuloFunction=require('./models/Articulo')
const CategoriaFunction=require('./models/Categoria')
const ProvedorFunction=require('./models/Provedor')
const ClienteFunction = require('./models/Cliente');
const TicketFunction=require('./models/Ticket');
const CompraFunction=require('./models/Compra');

const CajaFunction=require('./models/Caja');
const VendedorFunction=require('./models/Vendedor');
const CotizacionFunction=require('./models/Cotizacion');
const MercaderiaFunction=require('./models/Mercaderia');
const ValidadorFunction=require("./models/Validador")
const path = require('path');
const documentsPath = path.join(process.env.USERPROFILE, 'Documents');

// Construye la ruta completa al archivo SQLite en el directorio "Documents"
const databasePath = path.join(documentsPath,"CajaRegistradora", 'tienda.sqlite');

const dataBase=new Sequelize({
   dialect:'sqlite',
   storage:databasePath,
   database:"tienda"
})

ArticuloFunction(dataBase)
CategoriaFunction(dataBase)
ProvedorFunction(dataBase)

ClienteFunction(dataBase)
TicketFunction(dataBase)
CompraFunction(dataBase)

VendedorFunction(dataBase)
CajaFunction(dataBase)
CotizacionFunction(dataBase)
MercaderiaFunction(dataBase)

ValidadorFunction(dataBase)

// Creación de tablas
const { Articulo, Provedor , Categoria,Cliente,Ticket,Compra , Caja,Vendedor,Cotizacion,Mercaderia,Validador } = dataBase.models;



Categoria.hasMany(Articulo, { foreignKey: 'CategoriaId' });
Articulo.belongsTo(Categoria, { foreignKey: 'CategoriaId' });

Provedor.hasMany(Articulo, { foreignKey: 'ProvedorId' });
Articulo.belongsTo(Provedor, { foreignKey: 'ProvedorId' });

Cliente.hasMany(Ticket)
Ticket.belongsTo(Cliente)

Vendedor.hasMany(Ticket,{ foreignKey: 'VendedorId' })
Ticket.belongsTo(Vendedor,{ foreignKey: 'VendedorId' })

Ticket.hasMany(Compra)
Compra.belongsTo(Ticket)

Articulo.hasMany(Compra,{foreignKey:"ArticuloId"})
Compra.belongsTo(Articulo,{foreignKey:"ArticuloId"})

Caja.hasMany(Ticket)
Ticket.belongsTo(Caja)

Provedor.hasMany(Mercaderia)
Mercaderia.belongsTo(Provedor)

Vendedor.hasMany(Mercaderia)
Mercaderia.belongsTo(Vendedor)


module.exports = {
  dataBase,
  Mercaderia,
  Articulo,
  Provedor,
  Categoria,
  Compra,
  Ticket,
  Cliente,
  Vendedor,
  Caja,
  Cotizacion
};