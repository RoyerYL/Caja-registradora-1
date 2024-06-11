const { Ticket } = require("../../DB_connection")

const getTicketData = async (req, res) => {
    try {
        const ticket=await Ticket.findAll()

        return res.status(201).json(ticket);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const postTicketData = async (req, res) => {
    const {
        name,
        direccion,
        zona,
        calular,
        cuit
    } = req.body;


    try {

        const newData = await TicketData.create({
            name,
            direccion,
            zona,
            calular,
            cuit
        })


        return res.status(201).json(newData);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getTicketData,postTicketData};