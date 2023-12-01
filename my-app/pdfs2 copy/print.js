const printer = require('node-thermal-printer');
const fs = require('fs');
const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');
async function printPDF(filePath) {
    
    let printer = new ThermalPrinter({
      interface: 'usb://Nombre_del_Dispositivo_USB',                       // Printer interface
      characterSet: CharacterSet.PC852_LATIN2,                  // Printer character set
      removeSpecialCharacters: false,                           // Removes special characters - default: false
      lineCharacter: "=",                                       // Set character for lines - default: "-"
      breakLine: BreakLine.WORD,                                // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
      options:{                                                 // Additional options
        timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
      }
    });
    printer.print("Hello World");
  // Establece la interfaz de la impresora
//   printer.init({
//     type: 'epson',
//     interface: 'printer',
//   });

  // Establece el tamaño del papel y otros ajustes según tu impresora
//   printer.setSize('small');
//   printer.alignCenter();
//   printer.bold(true);

  // Lee el contenido del archivo PDF y lo imprime
  const fileContent = fs.readFileSync(filePath, 'utf8');
//   printer.text(fileContent);

  // Corta el papel (si es necesario)
  printer.cut();

  // Envia a imprimir
  printer.execute();
}

// Llama a la función para imprimir un archivo PDF
printPDF('output.pdf');
