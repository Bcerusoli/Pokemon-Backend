const db = require("../models");

exports.addPokemonToEquipo = async (req, res) => {
    const { equipoId, pokemonId } = req.body;

    if (!equipoId || !pokemonId) {
        return res.status(400).send({ message: "El ID del equipo y el ID del Pokémon son requeridos" });
    }

    try {
        
        const equipo = await db.equipo.findByPk(equipoId);
        if (!equipo) {
            return res.status(404).send({ message: "Equipo no encontrado" });
        }

    
        const pokemon = await db.pokemon.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }

        
        const pokemonCount = await db.pokemonEquipo.count({ where: { equipoId } });
        if (pokemonCount >= 6) {
            return res.status(400).send({ message: "El equipo ya tiene el máximo de 6 Pokémon" });
        }

        
        const pokemonEquipo = await db.pokemonEquipo.create({ equipoId, pokemonId });

        
        const pokemonConDetalles = await db.pokemon.findByPk(pokemonId, {
            attributes: ["id", "nombre", "imagen", "baseHP", "baseAtaque", "baseDefensa", "baseAtaqueEspecial", "baseDefensaEspecial", "baseVelocidad"],
        });

        res.send({
            id: pokemonEquipo.id,
            equipoId: pokemonEquipo.equipoId,
            pokemon: pokemonConDetalles,
        });
    } catch (error) {
        console.error("Error añadiendo Pokémon al equipo:", error);
        res.status(500).send({ message: "Error al añadir Pokémon al equipo" });
    }
};

exports.listPokemonInEquipo = async (req, res) => {
    const { equipoId } = req.params;

    if (!equipoId) {
        return res.status(400).send({ message: "El ID del equipo es requerido" });
    }

    try {
        
        const equipo = await db.equipo.findByPk(equipoId);
        if (!equipo) {
            return res.status(404).send({ message: "Equipo no encontrado" });
        }

        
        const pokemonEquipos = await db.pokemonEquipo.findAll({
            where: { equipoId },
            include: [
                {
                    model: db.pokemon,
                    as: "pokemon",
                    attributes: ["id", "nombre", "imagen", "baseHP", "baseAtaque", "baseDefensa", "baseAtaqueEspecial", "baseDefensaEspecial", "baseVelocidad"],
                },
            ],
        });

        res.send(pokemonEquipos);
    } catch (error) {
        console.error("Error listando Pokémon en el equipo:", error);
        res.status(500).send({ message: "Error al listar Pokémon en el equipo" });
    }
};

exports.removePokemonFromEquipo = async (req, res) => {
    const { id } = req.params;

    try {
        
        const pokemonEquipo = await db.pokemonEquipo.findByPk(id);
        if (!pokemonEquipo) {
            return res.status(404).send({ message: "El Pokémon no está en el equipo" });
        }

        
        await pokemonEquipo.destroy();
        res.send({ message: `Pokémon con ID ${id} eliminado del equipo` });
    } catch (error) {
        console.error("Error eliminando Pokémon del equipo:", error);
        res.status(500).send({ message: "Error al eliminar Pokémon del equipo" });
    }
};
exports.getPokemonDetails = async (req, res) => {
    const { id } = req.params; 

    try {
        const pokemonEquipo = await db.pokemonEquipo.findOne({
            where: { id },
            include: [
                {
                    model: db.pokemon,
                    as: "pokemon",
                    attributes: ["id", "nombre", "imagen", "baseHP", "baseAtaque", "baseDefensa", "baseAtaqueEspecial", "baseDefensaEspecial", "baseVelocidad"],
                    include: [
                        {
                            model: db.habilidad,
                            as: "habilidades",
                            attributes: ["id", "nombre"],
                        },
                    ],
                },
            ],
        });

        if (!pokemonEquipo) {
            return res.status(404).send({ message: "Pokémon no encontrado en el equipo" });
        }

        res.send({
            id: pokemonEquipo.id,
            equipoId: pokemonEquipo.equipoId,
            apodo: pokemonEquipo.apodo || "",
            ivHP: pokemonEquipo.ivHP,
            ivAtaque: pokemonEquipo.ivAtaque,
            ivDefensa: pokemonEquipo.ivDefensa,
            ivAtaqueEspecial: pokemonEquipo.ivAtaqueEspecial,
            ivDefensaEspecial: pokemonEquipo.ivDefensaEspecial,
            ivVelocidad: pokemonEquipo.ivVelocidad,
            pokemon: pokemonEquipo.pokemon,
        });
    } catch (error) {
        console.error("Error obteniendo detalles del Pokémon:", error);
        res.status(500).send({ message: "Error al obtener detalles del Pokémon" });
    }
};
exports.updateNickname = async (req, res) => {
    const { id } = req.params;
    const { apodo } = req.body;

    if (!apodo) {
        return res.status(400).send({ message: "El apodo es requerido" });
    }

    try {
        
        const pokemonEquipo = await db.pokemonEquipo.findOne({ where: { id } });
        if (!pokemonEquipo) {
            return res.status(404).send({ message: "Pokémon no encontrado en el equipo" });
        }

        
        pokemonEquipo.apodo = apodo;
        await pokemonEquipo.save();

        res.send({ message: "Apodo actualizado correctamente", pokemonEquipo });
    } catch (error) {
        console.error("Error actualizando el apodo:", error);
        res.status(500).send({ message: "Error al actualizar el apodo" });
    }
};
exports.assignItemToPokemon = async (req, res) => {
    const { id } = req.params;
    const { itemId } = req.body;

    try {
        
        const pokemonEquipo = await db.pokemonEquipo.findOne({ where: { id } });
        if (!pokemonEquipo) {
            return res.status(404).send({ message: "Pokémon no encontrado en el equipo" });
        }

        
        const item = await db.item.findByPk(itemId);
        if (!item) {
            return res.status(404).send({ message: "Ítem no encontrado" });
        }

        
        pokemonEquipo.itemId = itemId;
        await pokemonEquipo.save();

        res.send({ message: "Ítem asignado correctamente", pokemonEquipo });
    } catch (error) {
        console.error("Error asignando ítem al Pokémon:", error);
        res.status(500).send({ message: "Error al asignar ítem al Pokémon" });
    }
};
exports.assignHabilidadToPokemonEquipo = async (req, res) => {
    const { id } = req.params; 
    const { habilidadId } = req.body;

    if (!habilidadId) {
        return res.status(400).send({ message: "El ID de la habilidad es requerido" });
    }

    try {
        
        const pokemonEquipo = await db.pokemonEquipo.findByPk(id);
        if (!pokemonEquipo) {
            return res.status(404).send({ message: "Pokémon en el equipo no encontrado" });
        }

      
        const habilidad = await db.habilidad.findByPk(habilidadId);
        if (!habilidad) {
            return res.status(404).send({ message: "Habilidad no encontrada" });
        }

        
        pokemonEquipo.habilidadId = habilidadId;
        await pokemonEquipo.save();

        res.send({ message: "Habilidad asignada correctamente al Pokémon en el equipo", pokemonEquipo });
    } catch (error) {
        console.error("Error asignando habilidad al Pokémon en el equipo:", error);
        res.status(500).send({ message: "Error al asignar habilidad al Pokémon en el equipo" });
    }
};