const { Provedor } = require("../../DB_connection")

const postProvedor = async (req, res) => {
    const {

        razonSocial,
        nombreComercial,
        direccion,
        provincia,
        telefono1,
        telefono2,
        telefono3,
        email,
        personContacto,
        comentarios,
    } = req.body;

    if (!razonSocial || !nombreComercial) {
        return res.status(400).json({ error: "Faltan datos" })
    } else { console.log("todo en orden"); }

    try {
        const [newUser, created] = await Provedor.findOrCreate({
            where: {
                razonSocial,
                nombreComercial,
            },
            defaults: {
                direccion:direccion || "",
                provincia:provincia || "",
                telefono1:telefono1 || "",
                telefono2:telefono2 || "",
                telefono3:telefono3 || "",
                email:email || "",
                personContacto:personContacto || "",
                comentarios:comentarios || "",
            }
        })
        if (!created) { return res.status(409).json({ error: "El provedor ya está registrado " }) }

        const allProvedores = await Provedor.findAll()

        return res.status(201).json(allProvedores);

    } catch (error) {

        return res.status(500).json({ error: error.message })

    }
}
module.exports = { postProvedor };