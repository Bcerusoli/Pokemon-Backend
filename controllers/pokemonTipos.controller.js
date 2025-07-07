const db = require("../models");

exports.assignTipoToPokemon = async (req, res) => {
    const { pokemonId } = req.params;
    const { tipoId } = req.body;

    try {
        
        const pokemon = await db.pokemon.findByPk(pokemonId, {
            include: [
                {
                    model: db.tipo,
                    as: "tipos",
                },
            ],
        });

        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }

        
        const tipo = await db.tipo.findByPk(tipoId);
        if (!tipo) {
            return res.status(404).send({ message: "Tipo no encontrado" });
        }

        
        if (pokemon.tipos.length >= 2) {
            return res.status(400).send({ message: "El Pokémon ya tiene el máximo de 2 tipos asignados" });
        }

        // Verificar si el Tipo ya está asignado al Pokémon
        const existingAssociation = await db.sequelize.models.PokemonTipos.findOne({
            where: {
                pokemonId: pokemonId,
                tipoId: tipoId,
            },
        });

        if (existingAssociation) {
            return res.status(400).send({ message: "Este tipo ya está asignado al Pokémon" });
        }

        // Asignar el Tipo al Pokémon
        await db.sequelize.models.PokemonTipos.create({
            pokemonId: pokemonId,
            tipoId: tipoId,
        });

        res.send({ message: "Tipo asignado correctamente al Pokémon" });
    } catch (error) {
        console.error("Error asignando tipo al Pokémon:", error);
        res.status(500).send({ message: "Error al asignar tipo al Pokémon" });
    }
};


exports.listTiposForPokemon = async (req, res) => {
    const { pokemonId } = req.params;

    try {
        const pokemon = await db.pokemon.findByPk(pokemonId, {
            include: [
                {
                    model: db.tipo,
                    as: "tipos",
                    attributes: ["id", "nombre"],
                },
            ],
        });

        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }

        res.send(pokemon.tipos);
    } catch (error) {
        console.error("Error listando tipos del Pokémon:", error);
        res.status(500).send({ message: "Error al listar tipos del Pokémon" });
    }
};
