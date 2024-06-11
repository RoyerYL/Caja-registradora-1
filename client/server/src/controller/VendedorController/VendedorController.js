const { Vendedor } = require("../../DB_connection")

const getAllVendedors = async (req, res) => {

    try {
        const allVendedores=await Vendedor.findAll()

        return res.status(201).json(allVendedores);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const deleteVendedor= async (req, res) => {
    const {id}=req.params
    try {
         if(id===1){return res.status(200).json("No se puede eliminar Admin")}
        const vendedor=await Vendedor.destroy(
            {where:{id}})

        return res.status(201).json(vendedor);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const getVendedor= async (req, res) => {
    const {id}=req.params
    try {
        const vendedor=await Vendedor.findByPk(id)

        return res.status(201).json(vendedor);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

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

const updateVendedor= async (req, res) => {
    const {id,vendedor}=req.body
    try {
        const newVendedor=await Vendedor.update(
            {vendedor:vendedor},
            {where:{id:id}}
        )

        return res.status(201).json(newVendedor);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllVendedors,deleteVendedor,getVendedor,postVendedor,updateVendedor};