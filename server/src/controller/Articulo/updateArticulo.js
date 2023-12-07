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
            CategoriaId,
            ProvedorId
        };
        console.log(req.body);
        console.log("---------");
        console.log(updateObject);
        if (!stockMin) {
            updateObject.stockMin = 0.00;
        }
        if (!ganancia_2) {
            updateObject.ganancia_2 = "";
        }
        if (!ProvedorId) {
            console.log("hola mundo");
            updateObject.ProvedorId = 0;
        }
        if (!CategoriaId) {
            updateObject.CategoriumId = 0;
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