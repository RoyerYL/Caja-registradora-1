const { Vendedor } = require("../../DB_connection");

const getVendedor= async (req, res) => {
    const {id}=req.params
    try {
        const vendedor=await Vendedor.findByPk(id)

        return res.status(201).json(vendedor);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getVendedor};