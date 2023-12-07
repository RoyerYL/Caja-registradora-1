const { Compra } = require("../../DB_connection")

const getAllCompras = async (req, res) => {

    try {
        const allCompras=await Compra.findAll()

        return res.status(201).json(allCompras);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllCompras};