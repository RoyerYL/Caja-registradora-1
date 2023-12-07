const { Ticket } = require("../../DB_connection")

const getAllTickets = async (req, res) => {

    try {
        const allTickets=await Ticket.findAll()

        return res.status(201).json(allTickets);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllTickets};