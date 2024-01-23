const { Articulo ,Categoria} = require("../../DB_connection")
const { where, fn, col } = require("sequelize");

const addStock = async (req, res) => {

    const { id, stock } = req.body;

    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });

        const stockActualizado = articulo.stock + stock;

        // Actualizar el precio del artículo
        await Articulo.update({ stock: stockActualizado }, { where: where(fn('lower', col('id')), fn('lower', id)) });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {addStock};