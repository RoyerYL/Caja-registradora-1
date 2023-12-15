const { Articulo } = require("../../DB_connection")

const actualizarPrecioPorcentaje = async (req, res) => {

    const { categoryId, porcentajeAumento } = req.body;

    try {
        // Obtener los artículos con la categoryId específica
        const articulos = await Articulo.findAll({ where: { CategoryId: categoryId } });

        if (articulos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron artículos con la categoryId proporcionada.' });
        }

        // Actualizar el precio de cada artículo con el porcentaje de aumento
        const updatePromises = articulos.map(async (articulo) => {
            const precioActualizado = articulo.precio * (1 + porcentajeAumento / 100);
            await Articulo.update({ precioVenta: precioActualizado }, { where: { id: articulo.id } });
        });

        // Esperar a que todas las actualizaciones se completen
        await Promise.all(updatePromises);

        return res.status(200).json({ message: 'Precios actualizados correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarPrecioPorcentaje};