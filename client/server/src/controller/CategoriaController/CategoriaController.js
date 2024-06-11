const { Categoria } = require("../../DB_connection")

const postCategoria = async (req, res) => {
    const {
        nameCategoria
    } = req.body;
    if (!nameCategoria) {
        return res.status(400).json({ error: "Faltan datos" })
    }
    try {
        const [newUser,created] = await Categoria.findOrCreate({
            where:{
                nameCategoria,
            }
        })
        if(!created){return res.status(409).json({error:"La categoria ya está registrado "})}

        const allCategorias=await Categoria.findAll()

        return res.status(201).json(allCategorias);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const getAllCategoria = async (req, res) => {

    try {
        const allCategorias=await Categoria.findAll()

        return res.status(201).json(allCategorias);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const getCategoria = async (req, res) => {
    const {id}=req.params
    try {
        const categoria=await Categoria.findByPk(id)

        return res.status(201).json(categoria);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

module.exports = {postCategoria,getAllCategoria,getCategoria};