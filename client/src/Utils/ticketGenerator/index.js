const { default: axios } = require('axios');
const fs = require('fs');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const pdfToPrinter = require('pdf-to-printer');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function ticketCreate(id) {


    let compras = []
    let fecha = ""
    let ticketId = 0
    let costo = 0
    let items = {}
    let nombreArt = ""
    if (!id) {
        throw new Error("faltan datos")
    }
    await axios(`http://localhost:3001/tienda/ticket/${id}`).then(({ data }) => {
        fecha = data.fecha
        ticketId = String(data.id).padStart(12, '0');
        costo = data.valorTotal
    })

    const item = async (codBarras) => {

    }
    const calculateTotal = (compras) => {
        console.log(compras.articles ,"articulos");
        return compras.articles.productos.reduce((acc, prod) => acc + prod.cantidad * prod.producto.precioVenta, 0);
    };
    await axios(`http://localhost:3001/tienda/compra/${id}`).then(async ({ data }) => {
        const total = calculateTotal(data[0])            
        items = await Promise.all(data[0]?.articles.productos.map(async (data) => {
            
            // return { text: `${data.name} \t ${compra.cantidad} \t 10$`, fontSize: 9, margin: [0, 0, 0, 5] }
            return {
                
                stack: [
                    { text: data.producto.name, fontSize: 8 },
                    { text: `${data.cantidad} X ${data.producto.precioVenta}   ${data.cantidad*data.producto.precioVenta}`, fontSize: 9 },
                    ],
                margin: [0, 0, 0, 5],
            };
        }))

    })


    // Define el tamaño de la página en puntos (aproximadamente 80 mm de ancho)
    // const pageSize = { width: 226.8, height: 1700 };
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
            { text: 'Mequitex', fontSize: 9, alignment: 'center', margin: [0, 0, 0, 10] },
            { text: 'av. fernandez de la cruz 3269', fontSize: 7, alignment: 'left', margin: [0, 0, 0, 0] },
            { text: 'villa soldati', fontSize: 7, alignment: 'left', margin: [0, 0, 0, 5] },
            { text: 'whatsapp: 115524-3993', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 4] },
            { text: 'CUIT:', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: 'iva responsable inscripto:', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
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