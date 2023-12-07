const { Articulo,Categoria,Provedor } = require("../../DB_connection")

const postArticulo = async (req, res) => {
    const {
        id,
        name,
        stock,
        stockMin,
        costoPeso,
        costoDolar,
        iva,
        ganancia,
        precioVenta,
        ganancia_2,
        precioVenta_2,
        descripcion,
        img,
        categoriaId,
        provedorId
        
    } = req.body;

    // if (!id || !name || !stock || !costoPeso || !costoDolar || !iva || !ganancia || !precioVenta) {
    //     return res.status(400).json({ error: "Faltan datos" })
    // }else{console.log("todo en orden");}
    if (!id) {
        return res.status(400).json({ error: "Falta el ID" });
    }
    
    if (!name) {
        return res.status(400).json({ error: "Falta el nombre" });
    }
    
    if (!stock) {
        return res.status(400).json({ error: "Falta el stock" });
    }
    
    if (!costoPeso) {
        return res.status(400).json({ error: "Falta el costo en pesos" });
    }
    
    if (!costoDolar) {
        return res.status(400).json({ error: "Falta el costo en dólares" });
    }
    
    if (!iva) {
        return res.status(400).json({ error: "Falta el IVA" });
    }
    
    if (!ganancia) {
        return res.status(400).json({ error: "Falta la ganancia" });
    }
    
    if (!precioVenta) {
        return res.status(400).json({ error: "Falta el precio de venta" });
    }
    
    console.log("Todos los datos están presentes");
    
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
                precioVenta,
            },
            defaults:{
                stockMin:stockMin || 0.00,
                descripcion:descripcion || "",
                ganancia_2:ganancia_2 || 0,
                precioVenta_2:precioVenta_2 || 0.00,
                img:img || "",
                CategoriaId:categoriaId || 0,
                ProvedorId:provedorId || 0,
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