const { Cliente ,Ticket} = require("../../DB_connection")

const getVentasCliente = async (req, res) => {
    const {id}=req.params
    try {

        const cliente=await Cliente.findByPk(id)
        let allTickets=[]
        if (Number(id)!==0) {
            allTickets=await Ticket.findAll({
                where:{ClienteId:id}
            })
            
        }else{
            allTickets=await Ticket.findAll({
                where:{ClienteId:null}
            })
        }

        return res.status(201).json({
            cliente:cliente,
            tickets:allTickets
        });

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getVentasCliente};