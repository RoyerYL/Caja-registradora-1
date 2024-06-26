const { Compra, Ticket } = require("../../DB_connection")
const { Op } = require("sequelize");

const getAllCompras = async (req, res) => {

    try {
        const allCompras = await Compra.findAll({
            include: [
                {
                    model: Ticket,
                    as: "Ticket"
                }
            ]
        })

        return res.status(201).json(allCompras);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const getCompra = async (req, res) => {
    const { id } = req.params
    try {
        const cliente = await Compra.findByPk(id)

        return res.status(201).json(cliente);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const getCompras = async (req, res) => {
    const { id } = req.params
    try {
        const cliente = await Compra.findAll({
            where: {
                TicketId: {
                    [Op.eq]: id
                }
            },
            include: [
                {
                    model: Ticket,
                    as: "Ticket"
                }
            ]
            // include: [
            //     {
            //         model: Articulo,
            //         attributes: ["id", "name", "stock", "stockMin", "costoPeso", "costoDolar", "iva", "ganancia", "CategoriaId", "ProvedorId", "precioVenta"],
            //         as: "Articulo"
            //     },

            // ]
        })

        return res.status(201).json(cliente);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const postCompra = async (req, res) => {
    const {
        cantidad,
        fecha,
        ticketId,
        articuloId,
        subTotal,
        articles
    } = req.body;

    // if (!cantida || !fecha || !ticketId || !articuloId) {
    //     return res.status(400).json({ error: "Faltan datos" })
    // }

    try {
        const newCompra = await Compra.create({
            fecha,
            articles,
            TicketId: ticketId,

        })


        return res.status(201).json(newCompra);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
module.exports = { getAllCompras, getCompras, getCompra, postCompra };