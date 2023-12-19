const { default: axios } = require('axios');
const fs = require('fs');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');

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
    await axios(`http://localhost:3001/tienda/compra/${id}`).then(async ({ data }) => {

        items = await Promise.all(data.map(async (compra) => {
            const { data } = await axios(`http://localhost:3001/tienda/articulo/${compra.ArticuloId}`)
            const total=compra.cantidad * data.precioVenta
            // return { text: `${data.name} \t ${compra.cantidad} \t 10$`, fontSize: 9, margin: [0, 0, 0, 5] }
            return {
                columns: [
                    { text: data.name, fontSize: 7},
                    { text: compra.cantidad, fontSize: 7 },
                    { text: total, fontSize: 9 },
                ],
                margin: [0, 0, 0, 5],
            };
        }))

    })


    // Define el tamaño de la página en puntos (aproximadamente 80 mm de ancho)
    const pageSize = { width: 226.8, height: 1700 };


    // Define la estructura del documento PDF
    const documentDefinition = {
        pageSize,  // Establece el tamaño de la página
        content: [
            { text: ticketId, fontSize: 13, alignment: 'left', margin: [0, 0, 0, 10] },
            { text: 'Mequitex', fontSize: 13, alignment: 'center', margin: [0, 0, 0, 10] },
            { text: 'av. fernandez de la cruz 3269', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 0] },
            { text: 'villa soldati', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 5] },
            { text: 'whatsapp: 115524-3993', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 4] },
            { text: 'CUIT:', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: 'iva responsable inscripto:', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: '------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: 'Recibo de Venta', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
            { text: fecha, fontSize: 12, margin: [0, 0, 0, 10] },
            { text: '------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            items,
            // { text: 'Artículo 1    $10.00', fontSize: 9, margin: [0, 0, 0, 5] },
            // { text: 'Artículo 2    $20.00', fontSize: 9, margin: [0, 0, 0, 5] },
            { text: '------------------------------------------------------------------', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: `Subtotal:$ ${costo}`, fontSize: 9, margin: [0, 0, 0, 5] },
            { text: `Rec:$`, fontSize: 7, margin: [0, 0, 0, 0] },
            { text: `Desc:$ `, fontSize: 7, margin: [0, 0, 0, 0] },
            { text: '=================================', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
            { text: `Total:$ ${costo}`, fontSize: 10, margin: [0, 10, 0, 10] },
            { text: '=================================', fontSize: 8, alignment: 'left', margin: [0, 0, 0, 3] },
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
module.exports = ticketCreate;