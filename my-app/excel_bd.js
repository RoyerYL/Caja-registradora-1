const fs = require('fs');
const xlsx = require('xlsx');
const { Client } = require('pg');

// Conectar a la base de datos
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'tienda',
  password: 'admin',
  port: 5432,
});

async function main() {
  await client.connect();
  console.log('Conectado a la base de datos');

  // Leer el archivo Excel
  const workbook = xlsx.readFile('Articulos20231122_0932.csv');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convertir los datos del Excel a un formato manejable
  const data = xlsx.utils.sheet_to_json(sheet);
    // console.log(data);
  // Insertar datos en la base de datos
  const query = 'INSERT INTO "Articulos"(id,name,stock,"costoPeso","costoDolar",iva,ganancia,"precioVenta") VALUES($1, $2,$3,$4,$5,$6,$7,$8)';
  for (const row of data) {

    const values = Object.values(row);
    // console.log("---");
     console.log(values);
    const [v1,v2,v3,v4,v5,v6,v7,v8]=values
    await client.query(query, values);
  }

  console.log('Datos insertados en la base de datos');

  // Cerrar la conexión
  await client.end();
  console.log('Conexión cerrada');
}

main();
