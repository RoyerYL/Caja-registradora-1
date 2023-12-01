const fs = require('fs');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const pdfToPrinter = require('pdf-to-printer');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function createPDF() {
  // Define el tamaño de la página en puntos (aproximadamente 80 mm de ancho)
  const pageSize = { width: 160, height: "auto" };
  const costo = 1500
  // Define la estructura del documento PDF
  const documentDefinition = {
    pageSize,  // Establece el tamaño de la página
    pageMargins: [0, 0, 0, 25],
    content: [
      { text: 'Mequitex', fontSize: 13, alignment: 'center', margin: [0, 0, 0, 0] },
      { text: 'av. fernandez de la cruz 3269', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 0] },
      { text: 'villa soldati', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 5] },
      { text: 'whatsapp: 115524-3993', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 4] },
      { text: 'CUIT:', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: 'iva responsable inscripto:', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: '------------------------------------------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: 'Recibo de Venta', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
      { text: 'Fecha: 24 de noviembre de 2023', fontSize: 12, margin: [0, 0, 0, 10] },
      { text: '------------------------------------------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: 'Artículo 1    $10.00', fontSize: 9, margin: [0, 0, 0, 5] },
      { text: 'Artículo 1    $10.00', fontSize: 9, margin: [0, 0, 0, 5] },
      { text: '------------------------------------------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: `Subtotal:$ ${costo}`, fontSize: 9, margin: [0, 0, 0, 5] },
      { text: `Rec:$ ${costo}`, fontSize: 7, margin: [0, 0, 0, 0] },
      { text: `Desc:$ ${costo}`, fontSize: 7, margin: [0, 0, 0, 0] },
      { text: '=================================================', fontSize: 8, alignment: 'left', margin: [5, 0, 5, 3] },
      { text: `Total:$ ${costo}`, fontSize: 10, margin: [0, 10, 0, 10] },
      { text: '=================================================', fontSize: 8, alignment: 'left', margin: [5, 0, 5, 3] },
      { text: '¡Gracias por tu compra!', fontSize: 12, alignment: 'center' , margin: [0, 0, 0, 0] },
      { text: '=================================================', fontSize: 8, alignment: 'left', margin: [5, 0, 5, 3] },
      { text: '', fontSize: 8, alignment: 'left', margin: [5, 0, 5, 3] },
      { text: '', fontSize: 8, alignment: 'left', margin: [5, 0, 5, 3] },
      { text: '', fontSize: 8, alignment: 'left', margin: [5, 0, 5, 3] },
    ],
    alignment: 'top',
    
  };
  // Crea el documento PDF
  const pdfDoc = pdfMake.createPdf(documentDefinition);

  // Guarda el documento en un archivo
  pdfDoc.getBuffer(async (buffer) => {
    fs.writeFileSync('output.pdf', buffer);
    console.log('PDF creado con éxito');

    // Imprime el PDF utilizando pdf-to-printer
    const pdfPath = 'output.pdf';

    try {
      // Obtén la lista de impresoras disponibles
      const printersList = await pdfToPrinter.getPrinters();
      if (printersList.length > 0) {
        // Usa la primera impresora de la lista (puedes ajustar la lógica según tus necesidades)
        const selectedPrinter = printersList[5].name;
        console.log(printersList);
        // Imprime el PDF utilizando pdf-to-printer y la impresora seleccionada
        await pdfToPrinter.print(pdfPath, { 
          printer: selectedPrinter,
          scale:"noscale" });
        console.log('PDF creado y enviado a la impresora con éxito');
      } else {
        console.error('No se encontraron impresoras disponibles.');
      }
    } catch (error) {
      console.error('Error al imprimir:', error);
    }
    // await pdfToPrinter.print('output.pdf',{size:'auto'});

    // console.log('PDF creado e impreso con éxito');
  });
}

// Llama a la función para crear el PDF
createPDF();
