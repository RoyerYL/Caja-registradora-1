const { Op, Sequelize, where, fn, col } = require("sequelize")
const { Articulo, Categoria } = require("../../DB_connection")

const getArticuloByCategoria = async (req, res) => {
    const { id } = req.query
    try {
        console.log(id);
        // const categoria = await Categoria.findByPk(id)
        // if (!articulo) {
        //     return res.status(500).json({ error: "No encontrado" })
        // }

        // const articulo = Articulo.findAll({
        //         where: { CategoriaId: categoria.id }
        //     })


        // return res.status(201).json(articulo);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = { getArticuloByCategoria };