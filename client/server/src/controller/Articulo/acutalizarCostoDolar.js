const { Articulo ,Categoria} = require("../../DB_connection")

const actualizarCostoDolar = async (req, res) => {

    const { articuloId, costoDolar } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ costoDolar: costoDolar }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {actualizarCostoDolar};