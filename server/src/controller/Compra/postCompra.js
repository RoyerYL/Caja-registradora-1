const { Compra, Ticket, Articulo } = require("../../DB_connection")

const postCompra = async (req, res) => {
    const {
        cantidad,
        fecha,
        ticketId,
        articuloId
    } = req.body;

    // if (!cantida || !fecha || !ticketId || !articuloId) {
    //     return res.status(400).json({ error: "Faltan datos" })
    // }

    try {
        const newCompra = await Compra.create({
                cantidad,
                fecha,
                TicketId:ticketId,
                ArticuloId:articuloId
            
        })


        return res.status(201).json(newCompra);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
module.exports = {postCompra};