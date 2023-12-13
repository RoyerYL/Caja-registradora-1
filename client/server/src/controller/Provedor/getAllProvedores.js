const { Provedor } = require("../../DB_connection")

const getAllProvedores = async (req, res) => {

    try {
        const allProvedores=await Provedor.findAll()

        return res.status(201).json(allProvedores);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = {getAllProvedores};