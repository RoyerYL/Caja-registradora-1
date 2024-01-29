const fs = require('fs');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const pdfToPrinter = require('pdf-to-printer');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function createPDF() {
  // Define la estructura del documento PDF
  var factura = {
    emisor: {
        nombre: "Nombre del emisor",
        direccion: "Dirección del emisor",
        cuit: "CUIT del emisor"
    },
    receptor: {
        nombre: "Nombre del receptor",
        direccion: "Dirección del receptor",
        cuit: "CUIT del receptor"
    },
    items: [
        { descripcion: "Producto ", cantidad: 2, precioUnitario: 100, subtotal: 200 },
        { descripcion: "Producto 2", cantidad: 1, precioUnitario: 50, subtotal: 50 }
    ],
    total: 250
};
var documentDefinition = {
  content: [
      {
          text: 'Factura Tipo A', style: 'header',
      },
      {
          text: 'Datos del Emisor', style: 'subheader'
      },
      {
          text: `Nombre: ${factura.emisor.nombre}\nDirección: ${factura.emisor.direccion}\nCUIT: ${factura.emisor.cuit}`, margin: [0, 10, 0, 10]
      },
      {
          text: 'Datos del Receptor', style: 'subheader'
      },
      {
          text: `Nombre: ${factura.receptor.nombre}\nDirección: ${factura.receptor.direccion}\nCUIT: ${factura.receptor.cuit}`, margin: [0, 10, 0, 10]
      },
      {
          text: 'Detalle de la Factura', style: 'subheader',
      },
      {
          table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                  ['Descripción', 'Cantidad', 'Precio Unitario', 'Subtotal'],
                  ...factura.items.map(item => [item.descripcion, item.cantidad, item.precioUnitario, item.subtotal])
              ]
          }
      },
      { text: `Total: $${factura.total}`, margin: [0, 20, 0, 0] }
  ],
  styles: {
      header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
      },
      subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
      }
  },
  pageSize: { width: 595.28, height: 841.89 }, // Tamaño de la página
  background: function (currentPage, pageSize) {
      // Dibuja el rectángulo en la primera página
      if (currentPage === 1) {
          return {
              canvas: [
                  {
                      type: 'rect',
                      x: 20,
                      y: 20,
                      w: pageSize.width - 40, // Ancho de la página menos los márgenes
                      h: pageSize.height - 40, // Alto de la página menos los márgenes
                      lineWidth: 2,
                      lineColor: 'black'
                  }
              ]
          };
      }
  },
  // Antes de cada página, verifica si es necesario agregar una nueva página
  beforePageContent: function (currentPage, pageSize) {
      if (currentPage > 1) {
          return { text: '', pageBreak: 'before' };
      }
  }
};
  // Crea el documento PDF
  const pdfDoc = pdfMake.createPdf(documentDefinition);

  // Guarda el documento en un archivo
  pdfDoc.getBuffer(async (buffer) => {
    fs.writeFileSync('output.pdf', buffer);
    console.log('PDF creado con éxito');
  })
//     // Imprime el PDF utilizando pdf-to-printer
//     const pdfPath = 'output.pdf';

//     try {
//       // Obtén la lista de impresoras disponibles
//       const printersList = await pdfToPrinter.getPrinters();
//       if (printersList.length > 0) {
//         // Usa la primera impresora de la lista (puedes ajustar la lógica según tus necesidades)
//         const selectedPrinter = printersList[5].name;
//         console.log(printersList);
//         // Imprime el PDF utilizando pdf-to-printer y la impresora seleccionada
//         await pdfToPrinter.print(pdfPath, { 
//           printer: selectedPrinter,
//           scale:"noscale" });
//         console.log('PDF creado y enviado a la impresora con éxito');
//       } else {
//         console.error('No se encontraron impresoras disponibles.');
//       }
//     } catch (error) {
//       console.error('Error al imprimir:', error);
//     }
//     // await pdfToPrinter.print('output.pdf',{size:'auto'});

//     // console.log('PDF creado e impreso con éxito');
//   });
}

// Llama a la función para crear el PDF
createPDF();
