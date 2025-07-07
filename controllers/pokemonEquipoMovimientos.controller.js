const db = require("../models");

exports.listMovimientosForPokemon = async (req, res) => {
    const { pokemonId } = req.params;
    try {
        const pokemon = await db.pokemon.findByPk(pokemonId, {
            include: [
                {
                    model: db.movimiento,
                    as: "movimientos",
                    attributes: ["id", "nombre", "poder", "categoria"],
                    include: [
                        {
                            model: db.tipo,
                            as: "tipo",
                            attributes: ["nombre"],
                        },
                    ],
                },
            ],
        });
        if (!pokemon) return res.status(404).send({ message: "Pokémon no encontrado" });
        res.send(pokemon.movimientos);
    } catch (error) {
        console.error("Error listando movimientos del Pokémon:", error);
        res.status(500).send({ message: "Error al listar movimientos del Pokémon" });
    }
};

exports.assignMovimientosToPokemonEquipo = async (req, res) => {
    const { id } = req.params; 
    const { movimientos } = req.body; 

    if (!Array.isArray(movimientos) || movimientos.length > 4) {
        return res.status(400).send({ message: "Debes seleccionar hasta 4 movimientos" });
    }

    try {
        
        const pokemonEquipo = await db.pokemonEquipo.findByPk(id, {
            include: [
                {
                    model: db.movimiento,
                    as: "movimientos",
                },
            ],
        });

        if (!pokemonEquipo) {
            return res.status(404).send({ message: "Pokémon en el equipo no encontrado" });
        }

        
        const validMovimientos = await db.movimiento.findAll({
            where: { id: movimientos },
        });

        if (validMovimientos.length !== movimientos.length) {
            return res.status(400).send({ message: "Uno o más movimientos no son válidos" });
        }

       
        await db.pokemonEquipoMovimientos.destroy({
            where: { pokemonEquipoId: id }, 
        });

        // Asignar los nuevos movimientos al Pokémon en el equipo
        const movimientosData = movimientos.map((movimientoId) => ({
            pokemonEquipoId: id,
            movimientoId,
        }));

        await db.pokemonEquipoMovimientos.bulkCreate(movimientosData);

        res.send({ message: "Movimientos asignados correctamente al Pokémon en el equipo" });
    } catch (error) {
        console.error("Error asignando movimientos al Pokémon en el equipo:", error);
        res.status(500).send({ message: "Error al asignar movimientos al Pokémon en el equipo" });
    }
};