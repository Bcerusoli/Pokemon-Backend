const db = require("../models");

exports.listMovimientos = async (req, res) => {
    try {
        const movimientos = await db.movimiento.findAll({
            attributes: ["id", "nombre", "poder", "categoria", "tipoId"],
            include: [
                {
                    model: db.tipo,
                    as: "tipo", 
                    attributes: ["id", "nombre"], 
                },
            ],
        });
        res.send(movimientos);
    } catch (error) {
        console.error("Error listing movimientos:", error);
        res.status(500).send({ message: "Error al listar movimientos" });
    }
};

exports.getMovimientoById = async (req, res) => {
    const { id } = req.params;
    try {
        const movimiento = await db.movimiento.findByPk(id, {
            attributes: ["id", "nombre", "poder", "categoria"],
        });
        if (!movimiento) {
            return res.status(404).send({ message: "Movimiento no encontrado" });
        }
        res.send(movimiento);
    } catch (error) {
        console.error("Error fetching movimiento:", error);
        res.status(500).send({ message: "Error al obtener movimiento" });
    }
};

exports.createMovimiento = async (req, res) => {
    const { nombre, poder, categoria, tipoId } = req.body;

    if (!nombre || !categoria || !tipoId) {
        return res.status(400).send({ message: "El nombre, la categoría y el tipo son requeridos" });
    }

    try {
        const tipo = await db.tipo.findByPk(tipoId);
        if (!tipo) {
            return res.status(404).send({ message: "Tipo no encontrado" });
        }

        const movimiento = await db.movimiento.create({ nombre, poder, categoria, tipoId });
        res.send(movimiento);
    } catch (error) {
        console.error("Error creating movimiento:", error);
        res.status(500).send({ message: "Error al crear movimiento" });
    }
};


exports.updateMovimiento = async (req, res) => {
    const { id } = req.params;
    const { nombre, poder, categoria, tipoId } = req.body;

    try {
        const movimiento = await db.movimiento.findByPk(id);
        if (!movimiento) {
            return res.status(404).send({ message: "Movimiento no encontrado" });
        }

        if (tipoId) {
            const tipo = await db.tipo.findByPk(tipoId);
            if (!tipo) {
                return res.status(404).send({ message: "Tipo no encontrado" });
            }
            movimiento.tipoId = tipoId;
        }

        movimiento.nombre = nombre || movimiento.nombre;
        movimiento.poder = poder || movimiento.poder;
        movimiento.categoria = categoria || movimiento.categoria;

        await movimiento.save();
        res.send(movimiento);
    } catch (error) {
        console.error("Error updating movimiento:", error);
        res.status(500).send({ message: "Error al actualizar movimiento" });
    }
};

exports.deleteMovimiento = async (req, res) => {
    const { id } = req.params;

    try {
        const movimiento = await db.movimiento.findByPk(id);
        if (!movimiento) {
            return res.status(404).send({ message: "Movimiento no encontrado" });
        }

        await movimiento.destroy();
        res.send({ message: `Movimiento con ID ${id} eliminado` });
    } catch (error) {
        console.error("Error deleting movimiento:", error);
        res.status(500).send({ message: "Error al eliminar movimiento" });
    }
};

exports.asociarMovimientoAPokemon = async (req, res) => {
    const { id } = req.params; 
    const { pokemonId } = req.body; 

    if (!pokemonId) {
        return res.status(400).send({ message: "El ID del Pokémon es requerido" });
    }

    try {
        const movimiento = await db.movimiento.findByPk(id);
        if (!movimiento) {
            return res.status(404).send({ message: "Movimiento no encontrado" });
        }

        const pokemon = await db.pokemon.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }

        await pokemon.addMovimiento(movimiento); // Relación muchos a muchos
        res.send({ message: `Movimiento asociado al Pokémon con ID ${pokemonId}` });
    } catch (error) {
        console.error("Error asociando movimiento al Pokémon:", error);
        res.status(500).send({ message: "Error al asociar movimiento al Pokémon" });
    }
};