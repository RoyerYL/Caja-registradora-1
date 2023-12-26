const { Vendedor } = require("../../DB_connection");

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
module.exports = {deleteVendedor};