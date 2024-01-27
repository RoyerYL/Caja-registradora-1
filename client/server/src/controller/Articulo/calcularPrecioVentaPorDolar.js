const { Op, Sequelize, where, fn, col } = require("sequelize")
const { Articulo } = require("../../DB_connection")

const calcularPrecioVentaPorDolar = async (req, res) => {
    try {
        Articulo.update(
            {

                // precioVenta:2
                precioVenta: Sequelize.literal(
                    ' "costoDolar" * (SELECT "cotizacionMep" FROM "Cotizacions" LIMIT 1) *(("ganancia" + 100)/100.00) * (("iva" + 100) / 100.00)'
                ),
            },
            {
                where: { precioEnDolar: true },
            }
        )
        return res.status(201).json("Datos actualizados");

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = { calcularPrecioVentaPorDolar };