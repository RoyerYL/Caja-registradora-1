const { Caja} = require("../../DB_connection")

const axtraxxion = async (req, res) => {

    const { id, extracciones } = req.body;

    try {

        // Actualizar el precio del artículo
        await Caja.update({ extracciones: extracciones }, { where: { id: id } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {extraccion};