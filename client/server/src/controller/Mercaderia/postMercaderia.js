const { Mercaderia, Vendedor, Provedor } = require("../../DB_connection")

const postMercaderia = async (req, res) => {
    const {
        provedorId,
        vendedorId,
        articulos,
        comentarios,
        subTotal,
        descuento,
        iva,
        percepciones,
        total,
    } = req.body;

    try {

        const newMercaderia = await Mercaderia.create({
            ProvedorId: provedorId,
            VendedorId: vendedorId,
            subTotal,
            descuento,
            iva,
            precepciones:percepciones,
            total,
            comentarios,
            articulos,
        })
        const allMercaderia = await Mercaderia.findAll()
        return res.status(201).json(allMercaderia);

    } catch (error) {

        return res.status(500).json({ error: error.message })

    }
}
module.exports = { postMercaderia };