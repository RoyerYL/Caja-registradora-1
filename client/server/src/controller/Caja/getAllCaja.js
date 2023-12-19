const { Caja } = require("../../DB_connection")

const getAllCaja = async (req, res) => {

    try {
        const allCaja=await Caja.findAll({
            order:[["fechaApertura","DESC"]],
            limit:10
        })

        return res.status(201).json(allCaja);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllCaja};