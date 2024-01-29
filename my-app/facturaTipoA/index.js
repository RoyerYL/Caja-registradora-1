const fs = require('fs');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const pdfToPrinter = require('pdf-to-printer');
// Definir los datos de la factura
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
        { descripcion: "Producto 1", cantidad: 2, precioUnitario: 100, subtotal: 200 },
        { descripcion: "Producto 2", cantidad: 1, precioUnitario: 50, subtotal: 50 }
    ],
    total: 250
};

// Crear la estructura del documento PDF
var documentDefinition = {
    content: [
        { text: 'Factura Tipo A', style: 'header' },
        { text: 'Datos del Emisor', style: 'subheader' },
        { text: `Nombre: ${factura.emisor.nombre}\nDirección: ${factura.emisor.direccion}\nCUIT: ${factura.emisor.cuit}`, margin: [0, 0, 0, 20] },
        { text: 'Datos del Receptor', style: 'subheader' },
        { text: `Nombre: ${factura.receptor.nombre}\nDirección: ${factura.receptor.direccion}\nCUIT: ${factura.receptor.cuit}`, margin: [0, 0, 0, 20] },
        { text: 'Detalle de la Factura', style: 'subheader' },
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
    }
};

// Generar el PDF
pdfMake.createPdf(documentDefinition).download('factura_tipo_a.pdf');

