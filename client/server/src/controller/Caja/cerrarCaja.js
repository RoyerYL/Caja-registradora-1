const { Caja,Ticket } = require("../../DB_connection")

const cerrarCaja = async (req, res) => {

    const { precioFinal, fechaCierre, id } = req.body;

    try {
        const ticket=await Ticket.findAll({
            where:{
                CajaId:id
            }
        })
        let totalIngreso=0
        ticket.forEach((t)=>{
            totalIngreso+=t.valorTotal
        })
        await Caja.update(
            { precioFinal, fechaCierre, apertura: false ,precioFinalCaja:totalIngreso},
            { where: { id } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = { cerrarCaja };