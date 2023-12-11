const { Provedor } = require("../../DB_connection")

const getProvedor = async (req, res) => {
    const {id}=req.params
    try {
        const provedor=await Provedor.findByPk(id)

        return res.status(201).json(provedor);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getProvedor};