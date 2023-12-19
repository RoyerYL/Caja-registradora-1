const server = require('../server/src/app');

const PORT = 3001;

const { dataBase } = require('../server/src/DB_connection');

dataBase.sync({alter:false}).then(()=>{
   server.listen(PORT, () => {
      console.log('Server raised in port: ' + PORT);
   });
})
