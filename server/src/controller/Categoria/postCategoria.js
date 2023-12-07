const { Categoria } = require("../../DB_connection")

const postCategoria = async (req, res) => {
    const {
        name
    } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Faltan datos" })
    }

    try {
        const [newUser,created] = await Categoria.findOrCreate({
            where:{
                name,
            }
        })
        if(!created){return res.status(409).json({error:"La categoria ya está registrado "})}

        const allCategorias=await Articulo.findAll()

        return res.status(201).json(allCategorias);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {postCategoria};