const { where, fn, col } = require("sequelize");
const { Articulo } = require("../../DB_connection")

const actualizarPorcentajeDolar = async (req, res) => {

    const { id, porcentajeAumento } = req.body;

    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });

        const precioActualizado = articulo.costoDolar * (1 + porcentajeAumento / 100);
        const articulo_=await Articulo.update({ costoDolar: precioActualizado }, { where: where(fn('lower', col('id')), fn('lower', id)) });

        console.log(articulo_);
        return res.status(200).json({ message: 'Precios actualizados correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = { actualizarPorcentajeDolar };