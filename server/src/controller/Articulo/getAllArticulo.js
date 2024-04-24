const { Articulo, Categoria } = require("../../DB_connection")

const getAllArticulos = async (req, res) => {

    try {
        const allArticulos=await Articulo.findAll({
            include:[Categoria]
        })

        return res.status(201).json(allArticulos);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllArticulos};