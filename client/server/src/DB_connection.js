const { Sequelize } = require('sequelize');
const ArticuloFunction=require('./models/Articulo')
const CategoriaFunction=require('./models/Categoria')
const ProvedorFunction=require('./models/Provedor')
const ClienteFunction = require('./models/Cliente');
const TicketFunction=require('./models/Ticket');
const TicketDataFunction=require('./models/TicketData');
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

TicketDataFunction(dataBase)

// Creación de tablas
const { Articulo, Provedor , Categoria,Cliente,Ticket,Compra , Caja,Vendedor,Cotizacion,Mercaderia,TicketData } = dataBase.models;

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

// Articulo.hasMany(Compra,{foreignKey:"ArticuloId"})
// Compra.belongsTo(Articulo,{foreignKey:"ArticuloId"})

Caja.hasMany(Ticket)
Ticket.belongsTo(Caja)

Provedor.hasMany(Mercaderia)
Mercaderia.belongsTo(Provedor)

Vendedor.hasMany(Mercaderia)
Mercaderia.belongsTo(Vendedor)

dataBase.sync()
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
    
    // Configura el hook `afterSync`
    return dataBase.afterSync(async () => {
      try {
        // Verifica si ya existe algún vendedor
        const vendedor = await Vendedor.findOne();
        if (!vendedor) {
          // Si no existe, crea el "vendedor admin"
          await Vendedor.create({
            vendedor: 'Admin',
          });
          console.log('Vendedor admin creado por defecto');
        }

        // Verifica si ya existe alguna categoría
        const categoria = await Categoria.findOne();
        if (!categoria) {
          // Si no existe, crea la categoría por defecto
          await Categoria.create({
            nameCategoria: 'Otros'
          });
          console.log('Categoría por defecto creada');
        }

        // Verifica si ya existe algún proveedor
        const proveedor = await Provedor.findOne();
        if (!proveedor) {
          // Si no existe, crea el proveedor por defecto
          await Provedor.create({
            razonSocial: 'Otros',
            nombreComercial: 'Otros'
          });
          console.log('Proveedor por defecto creado');
        }

        // Verifica si ya existe algún cliente
        const cliente = await Cliente.findOne();
        if (!cliente) {
          // Si no existe, crea el cliente por defecto
          await Cliente.create({
            nombre: 'Admin',
            razonSocial: 'Admin'
          });
          console.log('Cliente por defecto creado');
        }

      } catch (error) {
        console.error('Error creando datos por defecto:', error);
      }
    });
  })
  .catch(error => {
    console.error('Error sincronizando tablas:', error);
  });


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
  Cotizacion,
  TicketData
};