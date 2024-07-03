const { fn, col } = require("sequelize");
const { Articulo, Compra, Ticket, Cliente, Categoria, Vendedor } = require("../../DB_connection");

const getTickets = async (req, res) => {
    const {id,type , page = 1, limit = 10, order = "fecha", orderDirection = "DESC" } = req.query;

    try {
        const offset = (page - 1) * limit;
        let where = {};

        if (type === "client" && id) {
            where.ClienteId = id;
        } else if (type === "vendedor" && id) {
            where.VendedorId = id;
        }

        const allTickets = await Ticket.findAndCountAll({
            where,
            order: [[order, orderDirection]],
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [
                {
                    model: Vendedor,
                    attributes: ['vendedor'],
                    as: 'Vendedor',
                },
                {
                    model: Cliente,
                    attributes: ['nombre'],
                    as: 'Cliente',
                },
            ],
        });

        return res.status(200).json({
            totalTickets: allTickets.count,
            totalPages: Math.ceil(allTickets.count / limit),
            currentPage: parseInt(page),
            tickets: allTickets.rows,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getVentasPorCategoria = async (req, res) => {
    const { page = 1, limit = 10, order = "CategoriaId", orderDirection = "ASC" } = req.query;

    try {
        const offset = (page - 1) * limit;

        const ventas = await Articulo.findAndCountAll({
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
            order: [[order, orderDirection]],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        return res.status(200).json({
            totalVentas: ventas.count.length,
            totalPages: Math.ceil(ventas.count.length / limit),
            currentPage: parseInt(page),
            ventas: ventas.rows,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const cancelarTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.update({
            CajaId: null
        }, {
            where: { id }
        });

        return res.status(200).json(ticket);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByPk(id, {
            include: {
                model: Compra,
                as: 'Compras',
            },
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        return res.status(200).json(ticket);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const postTicket = async (req, res) => {
    const {
        valorTotal,
        fecha,
        descuento,
        clienteId,
        cajaId,
        vendedorId
    } = req.body;

    try {
        const newUser = await Ticket.create({
            valorTotal,
            fecha,
            descuento,
            ClienteId: clienteId,
            CajaId: cajaId,
            VendedorId: vendedorId
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getVentasPorCategoria, cancelarTicket, getTickets, postTicket, getTicket };
