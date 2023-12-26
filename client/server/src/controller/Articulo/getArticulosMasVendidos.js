const { Articulo } = require("../../DB_connection")

const getArticulosMasVendidos = async (req, res) => {

    try {
        const allArticulos=await Articulo.findAll({
            order:[["cantVendidos","DESC"]],
            limit:50
        })

        return res.status(201).json(allArticulos);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getArticulosMasVendidos};