const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

async function createPDF() {
  // Crea un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  // Establece el tamaño de la página (puedes ajustarlo según tus necesidades)
  page.setSize(600, 400);

  // Obtiene el contexto de la página para agregar elementos
  const { width, height } = page.getSize();
  const { content, drawText } = page;

  // Dibuja un rectángulo en la página (esto es solo un ejemplo)
//   content.drawRect(50, 50, width - 100, height - 100);
//   content.stroke();

  // Agrega texto al rectángulo
  drawText('Hola, este es un PDF generado con pdf-lib', {
    x: 70,
    y: height - 120,
    // font: await pdfDoc.embedFont(PDFDocument.Font.Helvetica),
    color: rgb(0, 0, 0),
  });

  // Guarda el documento en un archivo
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);

  console.log('PDF creado con éxito');
}

// Llama a la función para crear el PDF
createPDF();
