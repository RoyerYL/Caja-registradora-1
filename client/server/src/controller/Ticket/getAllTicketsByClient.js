const { Ticket } = require("../../DB_connection")

const getAllTicketsByClient = async (req, res) => {
    const{id} =req.params
    try {
        const allTickets=await Ticket.findAll({
            where:{ClienteId:id}
        })

        return res.status(201).json(allTickets);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllTicketsByClient};