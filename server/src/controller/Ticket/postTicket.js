const { Ticket ,Cliente} = require("../../DB_connection")

const postTicket = async (req, res) => {
    const {
        valorTotal,
        fecha,
        clienteId
    } = req.body;

    // if (valorTotal,fecha,clienteId) {
    //     return res.status(400).json({ error: "Faltan datos" })
    // }else{console.log("todo en orden");}

    try {

        const newUser = await Ticket.create({
                valorTotal,
                fecha,
                ClienteId:clienteId
        })


        return res.status(201).json(newUser);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {postTicket};