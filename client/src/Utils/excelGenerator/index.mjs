import axios from 'axios';
import * as XLSX from 'xlsx';

export default async function createExcelFile() {
  console.log("Hola, estás en la función de Excel");
  let productos = [];
  await axios("http://localhost:3001/tienda/articulo").then(({ data }) => { productos = data; });

  // Crear una hoja de cálculo de Excel
  const workbook = XLSX.utils.book_new();

  // Crear una hoja en el libro de Excel
  const worksheet = XLSX.utils.json_to_sheet(productos);

  // Agregar la hoja al libro de Excel
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

  // Guardar el libro como archivo Excel
  XLSX.writeFile(workbook, 'productos.xlsx');

  console.log('Archivo creado exitosamente.');
};
