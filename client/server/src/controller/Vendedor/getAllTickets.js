const { Vendedor } = require("../../DB_connection")

const getAllVendedors = async (req, res) => {

    try {
        const allVendedores=await Vendedor.findAll()

        return res.status(201).json(allVendedores);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllVendedors};