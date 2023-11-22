const { Articulo } = require("../DB_connection")

const getArticulo = async (req, res) => {
    const {id} = req.params
    try {
        const articulo=await Articulo.findByPk(id)

        return res.status(201).json(articulo);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getArticulo};