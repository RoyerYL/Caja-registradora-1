const { Caja, Ticket } = require('../../DB_connection'); // Asegúrate de que la ruta sea correcta

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

const getAllCaja = async (req, res) => {

    try {
        const allCaja=await Caja.findAll({
            order:[["fechaApertura","DESC"]],
            limit:25
        })

        return res.status(201).json(allCaja);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const getCaja= async (req, res) => {
    const {id}=req.params
    try {
        const caja=await Caja.findByPk(id)

        return res.status(201).json(caja);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

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

const postCaja = async (req, res) => {
    const {
        precioInicial,
        fechaApertura,
    } = req.body;
   

    try {
        const newCaja = await Caja.create({
            precioInicial,
            fechaApertura
        })
        

        const nuevoId = newCaja.get("id");

        return res.status(201).json({ id: nuevoId });

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const axtraxxion = async (req, res) => {

    const { id, extracciones } = req.body;

    try {

        // Actualizar el precio del artículo
        await Caja.update({ extracciones: extracciones }, { where: { id: id } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarIngreso = async (req, res) => {

    const { id, ingreso } = req.body;

    try {

        // Actualizar el precio del artículo
        await Caja.update({ ingreso: ingreso }, { where: { id: id } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    cerrarCaja,
    getAllCaja,
    getCaja,
    getCajaTicket,
    postCaja,
    axtraxxion,
    actualizarIngreso
};