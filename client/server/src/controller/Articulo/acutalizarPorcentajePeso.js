const { Articulo } = require("../../DB_connection")

const actualizarPorcentajePeso = async (req, res) => {

    const { id, porcentajeAumento } = req.body;

    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });

        const precioActualizado = articulo.costoDolar * (1 + porcentajeAumento / 100);
        await Articulo.update({ costoPeso: precioActualizado }, { where: { id: id } });

        // Esperar a que todas las actualizaciones se completen
        await Promise.all(updatePromises);

        return res.status(200).json({ message: 'Precios actualizados correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = { actualizarPorcentajePeso };