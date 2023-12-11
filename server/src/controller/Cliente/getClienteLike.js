const { Op } = require("sequelize");
const { Cliente } = require("../../DB_connection")


const getClienteLike = async (req, res) => {
  const { id } = req.params
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
module.exports = { getClienteLike };
