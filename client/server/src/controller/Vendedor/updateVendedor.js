const { Vendedor } = require("../../DB_connection");

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
module.exports = {updateVendedor};