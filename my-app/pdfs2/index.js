const fs = require('fs');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// async function createPDF() {
//   // Define la estructura del documento PDF
//   const documentDefinition = {
//     content: [
//       { text: 'pos-5890c', fontSize: 14 },
//       {
//         canvas: [
//           {
//             type: 'rect',
//             x: 50,
//             y: 50,
//             w: 500,
//             h: 300,
//             lineWidth: 2,
//             lineColor: '#000000',
//           },
//         ],
//       },
//     ],
//   };
async function createPDF() {
  // Define el tamaño de la página en puntos (aproximadamente 80 mm de ancho)
  const pageSize = { width: 226.8, height: 3276 };

  // Define la estructura del documento PDF
  const documentDefinition = {
    pageSize,  // Establece el tamaño de la página
    content: [
      { text: 'Recibo de Venta', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
      { text: 'Fecha: 24 de noviembre de 2023', fontSize: 12, margin: [0, 0, 0, 10] },
      { text: 'Artículo 1    $10.00', fontSize: 12, margin: [0, 0, 0, 5] },
      { text: 'Artículo 2    $20.00', fontSize: 12, margin: [0, 0, 0, 5] },
      { text: 'Total: $30.00', fontSize: 14, margin: [0, 10, 0, 10] },
      { text: '¡Gracias por tu compra!', fontSize: 12, alignment: 'center' },
    ],
  };
  // Crea el documento PDF
  const pdfDoc = pdfMake.createPdf(documentDefinition);

  // Guarda el documento en un archivo
  pdfDoc.getBuffer((buffer) => {
    fs.writeFileSync('output.pdf', buffer);
    console.log('PDF creado con éxito');
  });
}

// Llama a la función para crear el PDF
createPDF();

// const fs = require('fs');
// const pdfMake = require('pdfmake/build/pdfmake');
// const pdfFonts = require('pdfmake/build/vfs_fonts');

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// async function createPDF() {
//   // Define el tamaño de la página en puntos (aproximadamente 80 mm de ancho)
//   const pageSize = { width: 226.8, height: 297 };

//   // Define la estructura del documento PDF
//   const documentDefinition = {
//     pageSize,  // Establece el tamaño de la página
//     content: [
//       { text: 'Recibo de Venta', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
//       { text: 'Fecha: 24 de noviembre de 2023', fontSize: 12, margin: [0, 0, 0, 10] },
//       { text: 'Artículo 1    $10.00', fontSize: 12, margin: [0, 0, 0, 5] },
//       { text: 'Artículo 2    $20.00', fontSize: 12, margin: [0, 0, 0, 5] },
//       { text: 'Total: $30.00', fontSize: 14, margin: [0, 10, 0, 10] },
//       { text: '¡Gracias por tu compra!', fontSize: 12, alignment: 'center' },
//     ],
//   };

//   // Crea el documento PDF
//   const pdfDoc = pdfMake.createPdf(documentDefinition);

//   // Guarda el documento en un archivo
//   pdfDoc.getBuffer((buffer) => {
//     fs.writeFileSync('output.pdf', buffer);
//     console.log('PDF creado con éxito');
//   });
// }

// // Llama a la función para crear el PDF
// createPDF();
