const fs = require('fs');
const xlsx = require('xlsx');
const { Client } = require('pg');
const axios = require('axios');

// Conectar a la base de datos
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'pokemon',
  password: '742698135',
  port: 5432,
});

async function main() {
  await client.connect();
  // console.log('Conectado a la base de datos');

  // Leer el archivo Excel
  // const workbook = xlsx.readFile('Articulos20231122_0932.csv');
  // const sheetName = workbook.SheetNames[0];
  // const sheet = workbook.Sheets[sheetName];

  // Convertir los datos del Excel a un formato manejable
  // const data = xlsx.utils.sheet_to_json(sheet);
    // console.log(data);
  // Insertar datos en la base de datos
  const query = 'INSERT INTO "Sprites"(id,sprite,spriteshiny) VALUES($1, $2,$3)';
  const URL="https://pokeapi.co/api/v2/pokemon/"
   for (let i = 1; i < 152; i++) {
    try {
      const {data} = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)
      const {name,sprites}=data
      console.log(sprites.front_default);
      // await client.query(query,name,sprites.front_default,sprites.front_shiny)
    } catch (error) {
      
    }
   }


  // for (const row of data) {

  //   const values = Object.values(row);
  //   // console.log("---");
  //    console.log(values);
  //   const [v1,v2,v3,v4,v5,v6,v7,v8]=values
  //   await client.query(query, values);
  // }

  // console.log('Datos insertados en la base de datos');

  // Cerrar la conexión
  await client.end();
  // console.log('Conexión cerrada');
}

main();
