const { Cliente } = require("../../DB_connection")

const getCliente = async (req, res) => {
    const {id}=req.params
    try {
        const cliente=await Cliente.findByPk(id)

        return res.status(201).json(cliente);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getCliente};