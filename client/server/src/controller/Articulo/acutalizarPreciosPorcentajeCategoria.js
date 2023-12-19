const { Articulo } = require("../../DB_connection")

const actualizarPrecioPorcentajexCategoria = async (req, res) => {

    const { provedorId, porcentajeAumento } = req.body;

    try {
        // Obtener los artículos con la categoryId específica
        const articulos = await Articulo.findAll({ where: { ProvedorId: provedorId } });

        if (articulos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron artículos con la categoryId proporcionada.' });
        }

        // Actualizar el precio de cada artículo con el porcentaje de aumento
        const updatePromises = articulos.map(async (articulo) => {
            const precioActualizado = articulo.costoDolar * (1 + porcentajeAumento / 100);
            await Articulo.update({ costoDolar: precioActualizado }, { where: { id: articulo.id } });
        });

        // Esperar a que todas las actualizaciones se completen
        await Promise.all(updatePromises);

        return res.status(200).json({ message: 'Precios actualizados correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarPrecioPorcentajexCategoria};