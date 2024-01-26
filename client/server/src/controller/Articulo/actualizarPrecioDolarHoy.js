const { where, fn, col } = require("sequelize");
const { Articulo, Cotizacion } = require("../../DB_connection")

const actualizprecioPorcentaje = async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findAll()
        const { id, porcentajeAumento } = req.body;

        try {
            const articulo = await Articulo.findOne({
                where: where(fn('lower', col('id')), fn('lower', id)),
            });
            Number.parseFloat(((100 + iva) / 100) * ((100 + ganancia) / 100)).toFixed(2)
            const precioActualizado = Number.parseFloat((((100 + articulo.iva) / 100) * ((100 + articulo.iva) / 100) ))  articulo.costoDolar * ;
            const articulo_ = await Articulo.update({ precioVenta: precioActualizado }, { where: where(fn('lower', col('id')), fn('lower', id)) });

            return res.status(200).json({ message: 'Precios actualizados correctamente.' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    } catch (error) {

    }
}
module.exports = { actualizprecioPorcentaje };