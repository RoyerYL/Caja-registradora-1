const { Articulo } = require("../DB_connection")

const postArticulo = async (req, res) => {
    const {
        id,
        name,
        stock,
        costoPeso,
        costoDolar,
        iva,
        ganancia,
        precioVenta
    } = req.body;

    if (!id || !name || !stock || !costoPeso || !costoDolar || !iva || !ganancia || !precioVenta) {
        return res.status(400).json({ error: "Faltan datos" })
    }else{console.log("todo en orden");}

    try {

        const [newUser,created] = await Articulo.findOrCreate({
            where:{
                id,
                name,
                stock,
                costoPeso,
                costoDolar,
                iva,
                ganancia,
                precioVenta
            }
        })
        if(!created){return res.status(409).json({error:"El email ya está registrado "})}

        const allArticulos=await Articulo.findAll()

        return res.status(201).json(allArticulos);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {postArticulo};