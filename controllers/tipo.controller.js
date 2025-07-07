const db = require("../models");

exports.listTipos = async (req, res) => {
    try {
        const tipos = await db.tipo.findAll({
            attributes: ["id", "nombre"],
        });
        res.send(tipos);
    } catch (error) {
        console.error("Error listing tipos:", error);
        res.status(500).send({ message: "Error al listar tipos" });
    }
};

exports.getTipoById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipo = await db.tipo.findByPk(id, {
            attributes: ["id", "nombre"],
        });
        if (!tipo) {
            return res.status(404).send({ message: "Tipo no encontrado" });
        }
        res.send(tipo);
    } catch (error) {
        console.error("Error fetching tipo:", error);
        res.status(500).send({ message: "Error al obtener tipo" });
    }
};

exports.createTipo = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).send({ message: "El nombre del tipo es requerido" });
    }

    try {
        const tipo = await db.tipo.create({ nombre });
        res.send(tipo);
    } catch (error) {
        console.error("Error creating tipo:", error);
        res.status(500).send({ message: "Error al crear tipo" });
    }
};

exports.updateTipo = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const tipo = await db.tipo.findByPk(id);
        if (!tipo) {
            return res.status(404).send({ message: "Tipo no encontrado" });
        }

        tipo.nombre = nombre || tipo.nombre;
        await tipo.save();

        res.send(tipo);
    } catch (error) {
        console.error("Error updating tipo:", error);
        res.status(500).send({ message: "Error al actualizar tipo" });
    }
};

exports.deleteTipo = async (req, res) => {
    const { id } = req.params;

    try {
        const tipo = await db.tipo.findByPk(id);
        if (!tipo) {
            return res.status(404).send({ message: "Tipo no encontrado" });
        }

        await tipo.destroy();
        res.send({ message: `Tipo con ID ${id} eliminado` });
    } catch (error) {
        console.error("Error deleting tipo:", error);
        res.status(500).send({ message: "Error al eliminar tipo" });
    }
};