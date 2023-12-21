const { Articulo } = require("../../DB_connection");

const articuloVendido = async (req, res) => {
  const { id, cantVendidos } = req.body;

  try {
    // Encuentra el artículo por su ID
    const articulo = await Articulo.findByPk(id);

    if (!articulo) {
      console.log(`No se encontró un artículo con el ID ${id}.`);
      return res.status(404).json({ error: `No se encontró un artículo con el ID ${id}.` });
    }

    // Calcula la nueva cantidad de artículos vendidos
    const cantidadTotal = Number(articulo.cantVendidos) + Number(cantVendidos);
    const stockTotal=Number(articulo.stock)-Number(cantVendidos)
    // Guarda los cambios en la base de datos
    await articulo.update({ cantVendidos: cantidadTotal,stock:stockTotal });

    console.log(`Se aumentó la cantidad de vendidos para el artículo con ID ${id}.`);
    res.status(200).json({ message: `Se aumentó la cantidad de vendidos para el artículo con ID ${id}.` });

  } catch (error) {
    console.error('Error al aumentar la cantidad de vendidos:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { articuloVendido };
