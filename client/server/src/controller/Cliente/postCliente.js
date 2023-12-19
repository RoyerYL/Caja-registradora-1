const { Cliente } = require("../../DB_connection")

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
                razonSocial,
                nombre,

            },
            defaults: {
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

        const allClientes = await Articulo.findAll()

        return res.status(201).json(allClientes);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
module.exports = { postCliente };