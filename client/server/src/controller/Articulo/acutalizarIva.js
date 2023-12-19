const { Articulo ,Categoria} = require("../../DB_connection")

const actualizarIva = async (req, res) => {

    const { articuloId, iva } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ iva: iva }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarIva};