const { Op } = require("sequelize");
const { Articulo, Categoria } = require("../../DB_connection");

const getAllArticulos = async (req, res) => {
    let { name, id, page = 1, pageSize = 50, orderBy = 'id', orderDirection = 'ASC' } = req.query;

    try {
        const offset = (page - 1) * pageSize;

        let where = {};

        // Construir la condición WHERE para name
        if (name) {
            const nameWords = name.split(" ").filter(word => word.length > 0);
            where.name = {
                [Op.or]: nameWords.map(word => ({
                    [Op.like]: `%${word}%`
                }))
            };
        }

        // Construir la condición WHERE para id
        if (id) {
            where.id = {
                [Op.like]: `%${id}%`
            };
        }

        // Validar orderDirection
        const validOrderDirections = ['ASC', 'DESC'];
        if (!validOrderDirections.includes(orderDirection.toUpperCase())) {
            orderDirection = 'ASC';
        }

        // Validar orderBy
        const validOrderFields = ['id', 'name', 'precioVenta', 'stock'];
        if (!validOrderFields.includes(orderBy)) {
            orderBy = 'id';
        }

        const { count, rows } = await Articulo.findAndCountAll({
            where,
            include: [
                {
                    model: Categoria,
                }
            ],
            limit: pageSize,
            offset,
            order: [[orderBy, orderDirection]]
        });

        const totalPages = Math.ceil(count / pageSize);

        return res.status(200).json({
            totalPages,
            currentPage: parseInt(page, 10),
            pageSize: parseInt(pageSize, 10),
            totalItems: count,
            items: rows
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllArticulos };
