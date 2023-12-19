const { Caja } = require("../../DB_connection")

const postCaja = async (req, res) => {
    const {
        precioInicial,
        fechaApertura,
    } = req.body;
   

    try {
        const newCaja = await Caja.create({
            precioInicial,
            fechaApertura
        })
        

        const nuevoId = newCaja.get("id");

        return res.status(201).json({ id: nuevoId });

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {postCaja};