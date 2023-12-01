const { Articulo } = require("../DB_connection")

const updateArticulo = async (req, res) => {
    const {
        id,
        name,
        stock,
        costoPeso,
        costoDolar,
        iva,
        ganancia,
        precioVenta,
        descripcion,
        stockMin
    } = req.body;

    if (!id || !name || !stock || !costoPeso || !costoDolar || !iva || !ganancia || !precioVenta) {
        return res.status(400).json({ error: "Faltan datos" })
    }else{console.log("todo en orden");}

    try {

        const response=await Articulo.update(
            {
                name,
                stock,
                costoPeso,
                costoDolar,
                iva,
                ganancia,
                precioVenta,
                descripcion,
                stockMin
            },{
                where:{
                    id,
                }
            }
        )


        return res.status(201).json(response);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {updateArticulo};