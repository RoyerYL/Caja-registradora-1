const { Articulo,Categoria,Provedor } = require("../../DB_connection")

const updateArticulo = async (req, res) => {
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
        CategoriaId,
        ProvedorId

    } = req.body;



    try {
        let categoria = null
        let provedor = null
    
        try {
            const find = await Categoria.findByPk(CategoriaId)
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
            const find = await Provedor.findByPk(ProvedorId)
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
        const updateObject = {
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
            CategoriaId:categoria.id,
            ProvedorId:provedor.id
        };
        if (!stockMin) {
            updateObject.stockMin = 0.00;
        }
        if (!ganancia_2) {
            updateObject.ganancia_2 = "";
        }
      
        if (!descripcion) {
            updateObject.descripcion = "";
        }

        if (!precioVenta_2) {
            updateObject.precioVenta_2 = "";
        }

        const response = await Articulo.update(
            updateObject, {

            where: {
                id
            }
        }
        )


        return res.status(201).json(response);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = { updateArticulo };