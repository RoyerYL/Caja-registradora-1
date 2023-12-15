const { Articulo } = require("../../DB_connection")

const actualizarPrecios = async (req, res) => {

    const { categoryId, nuevoPrecio } = req.body;

    try {
        // Actualizar el precio de los artículos con la categoryId específica
        const result = await Articulo.update(
            { precioVenta: nuevoPrecio },
            { where: { CategoryId: categoryId } }
        );

        if (result[0] > 0) {
            return res.status(200).json({ message: 'Precio actualizado correctamente.' });
        } else {
            return res.status(404).json({ message: 'No se encontraron artículos con la categoryId proporcionada.' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarPrecios};