const { Compra } = require("../../DB_connection")

const getCompra = async (req, res) => {
    const {id}=req.params
    try {
        const cliente=await Compra.findByPk(id)

        return res.status(201).json(cliente);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getCompra};