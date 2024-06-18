const { fn, col } = require("sequelize");
const {Articulo,Compra, Ticket ,Cliente,Categoria ,Vendedor} = require("../../DB_connection")


const getTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByPk(id, {
            include: {
                model: Compra,
                as: 'Compras', // Asegúrate de que el alias coincida con el que has definido en tus asociaciones
            },
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        return res.status(200).json(ticket);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const postTicket = async (req, res) => {
    const {
        valorTotal,
        fecha,
        descuento,
        clienteId,
        cajaId,
        vendedorId
    } = req.body;

    // if (valorTotal,fecha,clienteId) {
    //     return res.status(400).json({ error: "Faltan datos" })
    // }else{console.log("todo en orden");}

    try {

        const newUser = await Ticket.create({
                valorTotal,
                fecha,
                descuento,
                ClienteId:clienteId,
                CajaId:cajaId,
                VendedorId:vendedorId

        })


        return res.status(201).json(newUser);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const getAllTicketsByClient = async (req, res) => {
    const{id} =req.params
    try {
        const allTickets=await Ticket.findAll({
            where:{ClienteId:id}
        })

        return res.status(201).json(allTickets);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const getVentasPorCategoria = async (req, res) => {
    try {
        const ventas = await Articulo.findAll({
            attributes: [
                'CategoriaId',
                [fn('SUM', col('cantVendidos')), 'totalVentas']
            ],
            include: [
                {
                    model: Categoria,
                    attributes: ['nameCategoria'],
                    as: 'Categorium',
                }
            ],
            group: ['CategoriaId'],
        });

        return res.status(200).json(ventas);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const getAllTicketsByVendedor = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10, order = "fecha", orderDirection = "DESC" } = req.query;

    try {
        const offset = (page - 1) * limit;
        
        const allTickets = await Ticket.findAndCountAll({
            where: { VendedorId: id },
            order: [[order, orderDirection]],
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [
                {
                    model: Vendedor,
                    as: 'Vendedor',
                },
                {
                    model: Cliente,
                    as: 'Cliente',
                },
            ],
        });

        return res.status(201).json({
            totalTickets: allTickets.count,
            totalPages: Math.ceil(allTickets.count / limit),
            currentPage: parseInt(page),
            tickets: allTickets.rows,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllTickets = async (req, res) => {

    try {
        const allTickets=await Ticket.findAll({
            order:[["fecha","DESC"]],
            limit:40,
            include: [
                {
                    model: Vendedor,
                    attributes: ['vendedor'], // selecciona solo el atributo 'nombre'
                    as: 'Vendedor', // el alias que usarás para referenciar al Vendedor
                },
                {
                    model: Cliente,
                    attributes: ['nombre'], // selecciona solo el atributo 'nombre'
                    as: 'Cliente', // el alias que usarás para referenciar al Cliente
                },
            ],
        })

        
        return res.status(201).json(allTickets);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const cancelarTicket = async (req, res) => {
    const {id}=req.params
    try {
        const ticket=await Ticket.update({
            CajaId:null
        },{
            where:{id}
        }
        )

        return res.status(201).json(ticket);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getVentasPorCategoria,getAllTicketsByVendedor,cancelarTicket,getAllTickets,getAllTicketsByClient,postTicket,getTicket};