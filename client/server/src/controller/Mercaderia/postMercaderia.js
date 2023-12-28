const { Mercaderia,Vendedor,Provedor } = require("../../DB_connection")

const postMercaderia = async (req, res) => {
    const {
        provedorId,
        vendedorId,
        articulos,
        comentarios
    } = req.body;

    try{

        await Mercaderia.create({
            ProvedorId:provedorId,
            VendedorId:vendedorId,
            comentarios,
            articulos
        })
        const allMercaderia=await Mercaderia.findAll()
        return res.status(201).json(allMercaderia);

    } catch (error) {

        return res.status(500).json({ error: error.message })

    }
}
module.exports = { postMercaderia };