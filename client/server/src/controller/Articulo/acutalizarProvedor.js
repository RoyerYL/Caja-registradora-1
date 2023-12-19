const { Articulo } = require("../../DB_connection")

const actualizarProvedor = async (req, res) => {

    const { articuloId, provedorId } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ ProvedorId: provedorId }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarProvedor};