const { Categoria } = require("../../DB_connection")

const getAllCategoria = async (req, res) => {

    try {
        const allCategorias=await Categoria.findAll()

        return res.status(201).json(allCategorias);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllCategoria};