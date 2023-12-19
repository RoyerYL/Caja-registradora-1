const { Articulo } = require("../../DB_connection")

const actualizarStockMin = async (req, res) => {

    const { articuloId, stockMin } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ stockMin: stockMin }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarStockMin};