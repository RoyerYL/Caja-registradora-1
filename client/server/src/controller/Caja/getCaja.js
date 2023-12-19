const { Caja } = require("../../DB_connection");

const getCaja= async (req, res) => {
    const {id}=req.params
    try {
        const caja=await Caja.findByPk(id)

        return res.status(201).json(caja);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getCaja};