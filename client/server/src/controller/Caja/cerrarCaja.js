const { Caja } = require("../../DB_connection")

const cerrarCaja = async (req, res) => {

    const { precioFinal, fechaCierre, id } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update(
            { precioFinal, fechaCierre, apertura: false },
            { where: { id } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = { cerrarCaja };