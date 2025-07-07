const db = require("../models");

exports.createHabilidad = async (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).send({ message: "El nombre y la descripción de la habilidad son requeridos" });
    }

    try {
        const habilidad = await db.habilidad.create({ nombre, descripcion });
        res.send(habilidad);
    } catch (error) {
        console.error("Error creando habilidad:", error);
        res.status(500).send({ message: "Error al crear la habilidad" });
    }
};

exports.assignHabilidadToPokemon = async (req, res) => {
    const { pokemonId } = req.params;
    const { habilidadId } = req.body;

    try {
        
        const pokemon = await db.pokemon.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }

        
        const habilidad = await db.habilidad.findByPk(habilidadId);
        if (!habilidad) {
            return res.status(404).send({ message: "Habilidad no encontrada" });
        }

        
        const existingAssociation = await db.sequelize.models.PokemonHabilidades.findOne({
            where: {
                pokemonId: pokemonId,
                habilidadId: habilidadId
            }
        });

        if (existingAssociation) {
            return res.status(400).send({ message: "Esta habilidad ya está asignada al Pokémon" });
        }

        // Verificar el límite de habilidades por Pokémon
        const habilidadesCount = await db.sequelize.models.PokemonHabilidades.count({
            where: { pokemonId: pokemonId }
        });

        if (habilidadesCount >= 3) {
            return res.status(400).send({ message: "El Pokémon ya tiene el máximo de 3 habilidades asignadas" });
        }

        // Asignar la habilidad al Pokémon usando la tabla intermedia
        await db.sequelize.models.PokemonHabilidades.create({
            pokemonId: pokemonId,
            habilidadId: habilidadId
        });

        res.send({ message: "Habilidad asignada correctamente al Pokémon" });
    } catch (error) {
        console.error("Error asignando habilidad al Pokémon:", error);
        res.status(500).send({ message: "Error al asignar la habilidad al Pokémon" });
    }
};

exports.listHabilidadesForPokemon = async (req, res) => {
    const { pokemonId } = req.params;

    try {
        
        const pokemon = await db.pokemon.findByPk(pokemonId, {
            include: [
                {
                    model: db.habilidad,
                    as: "habilidades",
                    attributes: ["id", "nombre", "descripcion"],
                },
            ],
        });

        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }

        res.send(pokemon.habilidades);
    } catch (error) {
        console.error("Error listando habilidades del Pokémon:", error);
        res.status(500).send({ message: "Error al listar habilidades del Pokémon" });
    }
};