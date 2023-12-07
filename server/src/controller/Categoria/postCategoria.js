const { Categoria } = require("../../DB_connection")

const postCategoria = async (req, res) => {
    const {
        nameCategoria
    } = req.body;
    console.log("-------------------");
    console.log(nameCategoria);
    console.log("-------------------");
    if (!nameCategoria) {
        return res.status(400).json({ error: "Faltan datos" })
    }
    console.log("-------------------");
    console.log("paso");
    console.log("-------------------");

    try {
        const [newUser,created] = await Categoria.findOrCreate({
            where:{
                nameCategoria,
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