const { Caja , Ticket} = require("../../DB_connection");

const getCajaTicket= async (req, res) => {
    const {id}=req.params
    try {
        const caja=await Caja.findByPk(id)
        const ticket=await Ticket.findAll({
            where:{
                id
            }
        })
        let totalIngreso=0
        ticket.forEach((t)=>{
            totalIngreso+=t.valorTotal
        })
        return res.status(201).json({caja,totalIngreso});

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getCajaTicket};