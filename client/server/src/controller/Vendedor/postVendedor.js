const { Vendedor } = require("../../DB_connection")

const postVendedor = async (req, res) => {
    const {
        vendedor
    } = req.body;
  

    try {
        const [newUser,created] = await Vendedor.findOrCreate({
            where:{
                vendedor,
            }
        })
        if(!created){return res.status(409).json({error:"La categoria ya está registrado "})}

        const allCategorias=await Vendedor.findAll()

        return res.status(201).json(allCategorias);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {postVendedor};