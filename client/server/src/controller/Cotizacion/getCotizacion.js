const { Cotizacion } = require("../../DB_connection")

const getCotizacion = async (req, res) => {

    try {
        const cotizacion=await Cotizacion.findAll()

        return res.status(201).json(cotizacion);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getCotizacion};