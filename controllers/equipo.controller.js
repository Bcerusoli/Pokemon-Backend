const db = require("../models");

exports.createEquipo = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).send({ message: "El nombre del equipo es requerido" });
    }

    try {
        const usuarioId = res.locals.usuario.id; 
        const equipo = await db.equipo.create({ nombre, usuarioId });
        res.send(equipo);
    } catch (error) {
        console.error("Error creating equipo:", error);
        res.status(500).send({ message: "Error al crear el equipo" });
    }
};

exports.listEquipos = async (req, res) => {
    try {
        const usuarioId = res.locals.usuario.id; 
        const equipos = await db.equipo.findAll({
            where: { usuarioId },
            attributes: ["id", "nombre", "createdAt", "updatedAt"],
        });
        res.send(equipos);
    } catch (error) {
        console.error("Error listing equipos:", error);
        res.status(500).send({ message: "Error al listar los equipos" });
    }
};

exports.getEquipoById = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioId = res.locals.usuario.id; 
        const equipo = await db.equipo.findOne({
            where: { id, usuarioId },
            attributes: ["id", "nombre", "createdAt", "updatedAt"],
        });

        if (!equipo) {
            return res.status(404).send({ message: "Equipo no encontrado" });
        }

        res.send(equipo);
    } catch (error) {
        console.error("Error fetching equipo:", error);
        res.status(500).send({ message: "Error al obtener el equipo" });
    }
};