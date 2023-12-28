const { Mercaderia } = require("../../DB_connection")

const getMercaderia = async (req, res) => {
    try{
        const allMercaderia=await Mercaderia.findAll()
        return res.status(201).json(allMercaderia);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
module.exports = { getMercaderia };