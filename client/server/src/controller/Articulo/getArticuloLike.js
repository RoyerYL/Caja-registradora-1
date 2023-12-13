const { Op } = require("sequelize");
const { Articulo } = require("../../DB_connection")


const getArticuloLike = async (req, res) => {
  const { id } = req.params
  try {
    let resultados = await Articulo.findAll({
      where: {
        id: {
          [Op.like]: `%${id}%`,
        },
      },
    });
    if (resultados.length === 0) {
      resultados = await Articulo.findAll({
        where: {
          name: {
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
module.exports = { getArticuloLike };
