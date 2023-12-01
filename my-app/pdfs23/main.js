const fs = require('fs');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function createWindow() {
  const win = new BrowserWindow({
    show: false, // No mostrar la ventana
  });

  win.loadFile(path.resolve(__dirname, 'output.pdf'));

  win.webContents.on('did-finish-load', () => {
    win.webContents.print({ silent: true, printBackground: true }, () => {
      // Cierra la ventana después de imprimir
      win.close();
      console.log('PDF creado e impreso con éxito');
    });
  });
}

async function createPDF() {
  // Define el tamaño de la página en puntos (aproximadamente 80 mm de ancho)
  const pageSize = { width: 226.8, height: 1700 };
  const costo = 1500;

  // Define la estructura del documento PDF
  const documentDefinition = {
    pageSize,  // Establece el tamaño de la página
    content: [
      { text: 'Mequitex', fontSize: 13, alignment: 'center', margin: [0, 0, 0, 10] },
      { text: 'av. fernandez de la cruz 3269', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 0] },
      { text: 'villa soldati', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 5] },
      { text: 'whatsapp: 115524-3993', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 4] },
      { text: 'CUIT:', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: 'iva responsable inscripto:', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: '------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: 'Recibo de Venta', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
      { text: 'Fecha: 24 de noviembre de 2023', fontSize: 12, margin: [0, 0, 0, 10] },
      { text: '------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: 'Artículo 1    $10.00', fontSize: 9, margin: [0, 0, 0, 5] },
      { text: 'Artículo 2    $20.00', fontSize: 9, margin: [0, 0, 0, 5] },
      { text: '------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: `Subtotal:$ ${costo}`, fontSize: 9, margin: [0, 0, 0, 5] },
      { text: `Rec:$ ${costo}`, fontSize: 7, margin: [0, 0, 0, 0] },
      { text: `Desc:$ ${costo}`, fontSize: 7, margin: [0, 0, 0, 0] },
      { text: '=================================', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: `Total:$ ${costo}`, fontSize: 10, margin: [0, 10, 0, 10] },
      { text: '=================================', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
      { text: '¡Gracias por tu compra!', fontSize: 12, alignment: 'center' , margin: [0, 0, 0, 0] },
    ],
    // Ajusta la alineación vertical del contenido para que comience desde la parte superior
    alignment: 'top',
  };

  // Crea el documento PDF
  const pdfDoc = pdfMake.createPdf(documentDefinition);

  // Guarda el documento en un archivo
  pdfDoc.getBuffer(async (buffer) => {
    fs.writeFileSync('output.pdf', buffer);
    console.log('PDF creado con éxito');

    // Crea la ventana de impresión
    app.whenReady().then(createWindow);
  });
}

// Llama a la función para crear el PDF
createPDF();
