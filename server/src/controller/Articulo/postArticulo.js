const { Articulo, Categoria, Provedor } = require("../../DB_connection")

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
    // } else { console.log("todo en orden"); }
    if (id === null) console.log("falta id");
    if (name === null) console.log("falta name");
    if (stock === null) console.log("falta stock");
    if (costoPeso === null) console.log("falta costoPeso");
    if (costoDolar === null) console.log("falta costoDolar");
    if (iva === null) console.log("falta iva");
    if (ganancia == null) console.log("falta ganancia");
    if (precioVenta === null) console.log("falta precioVenta");


    let categoria = null
    let provedor = null

    try {
        const find = await Categoria.findByPk(categoriaId)
        if (!find){

            const [newCategoria, created] = await Categoria.findOrCreate({
                where: {
                    // id: categoriaId,
                    nameCategoria: "No tiene categoria",
                },
            })
            
            categoria = newCategoria
        }
        categoria=find
    } catch (error) {

        console.log("error de categoria");
    }

    try {
        const find = await Provedor.findByPk(provedorId)
        if (!find) {

            const [newProvedor, created] = await Provedor.findOrCreate({
                where: {
                    // id: provedorId,
                    razonSocial: "No tiene provedor",
                    nombreComercial: "No tiene provedor",
                },
            })
            provedor = newProvedor
        } else {
            provedor = find
        }
    } catch (error) {
        console.log("error de provedor");
    }

    console.log("Todos los datos están presentes");

    try {

        const [newUser, created] = await Articulo.findOrCreate({
            where: {
                id,
                name,
                stock,
                costoPeso,
                costoDolar,
                iva,
                ganancia,
                precioVenta,
                ProvedorId: provedor.id,
                CategoriaId: categoria.id
            },
            defaults: {
                stockMin: stockMin || 0.00,
                descripcion: descripcion || "",
                ganancia_2: ganancia_2 || 0,
                precioVenta_2: precioVenta_2 || 0.00,
                img: img || "",
            }
        })
        if (!created) { return res.status(409).json({ error: "El email ya está registrado " }) }

        const allArticulos = await Articulo.findAll()

        return res.status(201).json(allArticulos);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = { postArticulo };