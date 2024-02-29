const server = require('../server/src/app');
const { dataBase, Articulo, Categoria, TicketData } = require('../server/src/DB_connection');

const PORT = 3001;

dataBase.sync({ alter: false }).then(() => {
  server.listen(PORT, () => {
    console.log('Server raised in port: ' + PORT);

    // Realizar la operación de alteración solo para la tabla Articulos después de iniciar el servidor
    Articulo.sync({ alter: true }).then(() => {
      console.log('Operación de alteración completada para la tabla Articulos.');
    }).catch((error) => {
      console.error('Error al realizar la operación de alteración para la tabla Articulos:', error);
    });
    // Realizar la operación de alteración solo para la tabla Articulos después de iniciar el servidor
    TicketData.sync({ alter: true }).then(() => {
      console.log('Operación de alteración completada para la tabla TicketData.');
    }).catch((error) => {
      console.error('Error al realizar la operación de alteración para la tabla Articulos:', error);
    });
  });
});
