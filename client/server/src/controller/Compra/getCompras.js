const { Op } = require("sequelize");
const { Compra ,Articulo} = require("../../DB_connection")

const getCompras = async (req, res) => {
    const {id}=req.params
    try {
        const cliente=await Compra.findAll({
            where:{
                TicketId:{
                    [Op.eq]:id 
                }
            },
            include: [
                {
                    model: Articulo,
                    attributes: ["id","name","stock","stockMin","costoPeso","costoDolar","iva","ganancia","CategoriaId","ProvedorId","precioVenta"],
                    as: "Articulo"
                },
                
            ]
        })

        return res.status(201).json(cliente);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getCompras};