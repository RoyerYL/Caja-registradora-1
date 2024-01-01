const { Ticket , Vendedor , Cliente } = require("../../DB_connection")

const getAllTickets = async (req, res) => {

    try {
        const allTickets=await Ticket.findAll({
            order:[["fecha","DESC"]],
            limit:40,
            include: [
                {
                    model: Vendedor,
                    attributes: ['vendedor'], // selecciona solo el atributo 'nombre'
                    as: 'Vendedor', // el alias que usarás para referenciar al Vendedor
                },
                {
                    model: Cliente,
                    attributes: ['nombre'], // selecciona solo el atributo 'nombre'
                    as: 'Cliente', // el alias que usarás para referenciar al Cliente
                },
            ],
        })

        
        return res.status(201).json(allTickets);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllTickets};