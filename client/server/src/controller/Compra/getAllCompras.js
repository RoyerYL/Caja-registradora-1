const { Compra, Articulo } = require("../../DB_connection")

const getAllCompras = async (req, res) => {

    try {
        const allCompras = await Compra.findAll({
            include: [
                {
                    model: Articulo,
                    attributes: ["id","name","stock","stockMin","costoPeso","costoDolar","iva","ganancia","CategoriaId","ProvedorId","precioVenta"],
                    as: "Articulo"
                }
            ]
        })

        return res.status(201).json(allCompras);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = { getAllCompras };