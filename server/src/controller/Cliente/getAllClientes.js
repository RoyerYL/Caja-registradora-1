const { Cliente } = require("../../DB_connection")

const getAllClientes = async (req, res) => {

    try {
        const allClientes=await Cliente.findAll()

        return res.status(201).json(allClientes);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllClientes};