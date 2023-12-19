const { Articulo ,Categoria} = require("../../DB_connection")

const actualizarGanancia = async (req, res) => {

    const { articuloId, ganancia } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ ganancia: ganancia }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarGanancia};