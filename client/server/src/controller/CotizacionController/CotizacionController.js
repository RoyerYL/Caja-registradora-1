const { Cotizacion } = require("../../DB_connection")

const getCotizacion = async (req, res) => {

    try {
        const cotizacion=await Cotizacion.findAll()

        return res.status(201).json(cotizacion);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const postCotizacion = async (req, res) => {
    const {
        cotizacionMep=0,
        cotizacionBlue
    } = req.body;


    try {
         // Intenta actualizar el registro
         const [updatedRows] = await Cotizacion.update(
            { cotizacionMep, cotizacionBlue },
            { where: { id: 1 } }
        );

        if (updatedRows === 0) {
            // Si no se actualizó ningún registro (porque no existe), entonces crea uno nuevo
            const newCotizacion = await Cotizacion.create({
                id: 1,
                cotizacionMep,
                cotizacionBlue,
            });
            return res.status(201).json(newCotizacion);
        }

        const cotizacion = await Cotizacion.findAll()

        return res.status(201).json(cotizacion);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getCotizacion,postCotizacion};