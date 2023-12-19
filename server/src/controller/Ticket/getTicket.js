const { Ticket } = require("../../DB_connection")

const getTicket = async (req, res) => {
    const {id}=req.params
    try {
        const ticket=await Ticket.findByPk(id)

        return res.status(201).json(ticket);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getTicket};