const { Categoria } = require("../../DB_connection");

const getCategoria = async (req, res) => {
    const {id}=req.params
    try {
        const categoria=await Categoria.findByPk(id)

        return res.status(201).json(categoria);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getCategoria};