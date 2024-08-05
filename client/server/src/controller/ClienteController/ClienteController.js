const { Op } = require("sequelize");
const { Cliente , Ticket} = require("../../DB_connection")


const getClienteLike = async (req, res) => {
    const { id } = req.params
    const { page = 1, limit = 10, order = 'fecha', orderDirection = 'DESC' } = req.query; // obtener página, límite, orden y dirección de la query string

    try {
        let resultados = await Cliente.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${id}%`,
                },
            },
        });

        // Si no hay resultados, consulta por otro parámetro 
        if (resultados.length === 0) {
            resultados = await Cliente.findAll({
                where: {
                    razonSocial: {
                        [Op.like]: `%${id}%`,
                    },
                },
            });
        }

        return res.status(201).json(resultados);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const getAllClientes = async (req, res) => {

    try {
        const allClientes = await Cliente.findAll()

        return res.status(201).json(allClientes);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const getCliente = async (req, res) => {
    const { id } = req.params
    try {
        const cliente = await Cliente.findByPk(id)

        return res.status(201).json(cliente);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
const getVentasCliente = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10, order = 'fecha', orderDirection = 'DESC' } = req.query; // obtener página, límite, orden y dirección de la query string

    try {
        const cliente = await Cliente.findByPk(id);
        let allTickets = [];
        const offset = (page - 1) * limit;

        if (Number(id) !== 0) {
            allTickets = await Ticket.findAll({
                where: { ClienteId: id },
                order: [[order, orderDirection.toUpperCase()]], // ordenar por columna y dirección especificada
                limit: Number(limit),
                offset: Number(offset)
            });
        } else {
            allTickets = await Ticket.findAll({
                where: { ClienteId: null },
                order: [[order, orderDirection.toUpperCase()]], // ordenar por columna y dirección especificada
                limit: Number(limit),
                offset: Number(offset)
            });
        }

        const totalTickets = await Ticket.count({ where: { ClienteId: id || null } });

        return res.status(201).json({
            cliente: cliente,
            tickets: allTickets,
            currentPage: Number(page),
            totalPages: Math.ceil(totalTickets / limit),
            totalTickets: totalTickets,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const postCliente = async (req, res) => {
    const {

        razonSocial,
        nombre,
        dni,
        direccion,
        zona,
        localidad,
        telefono1,
        telefono2,
        telefono3,
        email,
        comentarios,

    } = req.body;
    console.log(req.body);
    if (!razonSocial || !nombre) {
        return res.status(400).json({ error: "Faltan datos" })
    } else { console.log("todo en orden"); }

    try {
        const updateObject = {
            razonSocial,
            nombre,
            dni,
            direccion,
            zona,
            localidad,
            telefono1,
            telefono2,
            telefono3,
            email,
            comentarios,
        }
        const [newUser, created] = await Cliente.findOrCreate({
            where: {
                razonSocial

            },
            defaults: {
                nombre,
                dni: dni || 0,
                direccion: direccion || "",
                zona: zona || "",
                localidad: localidad || "",
                telefono1: telefono1 || "",
                telefono2: telefono2 || "",
                telefono3: telefono3 || "",
                email: email || "",
                comentarios: comentarios || "",
            }
        })
        if (!created) { return res.status(409).json({ error: "El Cliente ya está registrado " }) }

        const allClientes = await Cliente.findAll()

        return res.status(201).json(allClientes);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

module.exports = {
    postCliente,
    getVentasCliente,
    getClienteLike,
    getCliente,
    getAllClientes
};
