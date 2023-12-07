const { Op, Sequelize, where, fn, col } = require("sequelize")
const { Articulo } = require("../../DB_connection")

const getArticulo = async (req, res) => {
    const {id} = req.params
    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });
        if (!articulo) {
            return res.status(500).json({ error: "No encontrado"})    
        }
        return res.status(201).json(articulo);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getArticulo};