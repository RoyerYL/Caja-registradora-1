const { default: axios } = require('axios');
const fs = require('fs');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const pdfToPrinter = require('pdf-to-printer');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function ticketCreate(id, storeInfo) {
    console.log(storeInfo,"storeInfo");
    let compras = [];
    let fecha = "";
    let ticketId = 0;
    let costo = 0;
    let items = {};

    if (!id) {
        throw new Error("faltan datos");
    }

    await axios(`http://localhost:3001/tienda/ticket/${id}`).then(({ data }) => {
        fecha = data.fecha;
        ticketId = String(data.id).padStart(12, '0');
        costo = data.valorTotal;
    });

    const calculateTotal = (compras) => {
        console.log(compras.articles, "articulos");
        return compras.articles.productos.reduce((acc, prod) => acc + prod.cantidad * prod.producto.precioVenta, 0);
    };

    await axios(`http://localhost:3001/tienda/compra/${id}`).then(async ({ data }) => {
        const total = calculateTotal(data[0]);
        items = await Promise.all(data[0]?.articles.productos.map(async (data) => {
            return {
                stack: [
                    { text: data.producto.name, fontSize: 8 },
                    { text: `${data.cantidad} X ${data.producto.precioVenta}   ${data.cantidad * data.producto.precioVenta}`, fontSize: 9 },
                ],
                margin: [0, 0, 0, 5],
            };
        }));
    });

    // Define el tamaño de la página en puntos (aproximadamente 80 mm de ancho)
    const pageSize = { width: 140, height: "auto" };

    // Define la estructura del documento PDF
    const documentDefinition = {
        pageSize,  // Establece el tamaño de la página
        pageMargins: [0, 0, 0, 25],
        content: [
            { text: 'Ticket', fontSize: 9, alignment: 'left', margin: [0, 0, 0, 10] },
            { text: `N° ${ticketId}`, fontSize: 7, alignment: 'left', margin: [0, 0, 0, 10] },
            { text: `Fecha: ${fecha}`, fontSize: 7, margin: [0, 0, 0, 10] },
            { text: '---------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            storeInfo?.name ? { text: storeInfo.name, fontSize: 9, alignment: 'center', margin: [0, 0, 0, 10] } : {},
            storeInfo?.address ? { text: storeInfo.address, fontSize: 7, alignment: 'left', margin: [0, 0, 0, 0] } : {},
            storeInfo?.city ? { text: storeInfo.city, fontSize: 7, alignment: 'left', margin: [0, 0, 0, 5] } : {},
            storeInfo?.whatsapp ? { text: `whatsapp: ${storeInfo.whatsapp}`, fontSize: 8, alignment: 'left', margin: [0, 0, 0, 4] } : {},
            storeInfo?.cuit ? { text: `CUIT: ${storeInfo.cuit}`, fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] } : {},
            { text: `iva: Iva responsable inscripto`, fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: '---------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            items,
            { text: '---------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: `Subtotal:$ ${costo}`, fontSize: 9, margin: [0, 0, 0, 5] },
            { text: `Rec:$`, fontSize: 7, margin: [0, 0, 0, 0] },
            { text: `Desc:$ `, fontSize: 7, margin: [0, 0, 0, 0] },
            { text: '===============================', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: `Total:$ ${costo}`, fontSize: 10, margin: [0, 10, 0, 10] },
            { text: '===============================', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: '¡Gracias por tu compra!', fontSize: 12, alignment: 'center' },
            { text: '===============================', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
        ],
        pageMargins: [0, 0, 0, 25],
    };

    // Crea el documento PDF
    const pdfDoc = pdfMake.createPdf(documentDefinition);

    // Guarda el documento en un archivo
    pdfDoc.getBuffer(async (buffer) => {
        fs.writeFileSync('output.pdf', buffer);
        console.log('PDF creado con éxito');

        const pdfPath = 'output.pdf';
        try {
            const printersList = await pdfToPrinter.getPrinters();
            if (printersList.length > 0) {
                const selectedPrinter = printersList[5].name;
                await pdfToPrinter.print(pdfPath, {
                    printer: selectedPrinter,
                    scale: "noscale"
                });
                console.log('PDF creado y enviado a la impresora con éxito');
            } else {
                console.error('No se encontraron impresoras disponibles.');
            }
        } catch (error) {
            console.error('Error al imprimir:', error);
        }
    });
}

// Llama a la función para crear el PDF
module.exports = ticketCreate;
