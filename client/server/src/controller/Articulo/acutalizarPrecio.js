const { Articulo } = require("../../DB_connection")

const actualizarPrecio = async (req, res) => {

    const { articuloId, nuevoPrecio } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ precioVenta: nuevoPrecio }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarPrecio};