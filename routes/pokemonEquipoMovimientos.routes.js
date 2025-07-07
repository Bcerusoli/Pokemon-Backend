const pokemonEquipoMovimientosController = require("../controllers/pokemonEquipoMovimientos.controller.js");

module.exports = app => {
    const router = require("express").Router();

    // Ruta para listar los movimientos que un Pokémon puede aprender
    router.get("/:pokemonId/movimientos", pokemonEquipoMovimientosController.listMovimientosForPokemon);

    // Ruta para asignar movimientos al Pokémon en el equipo
    router.put("/:id/movimientos", pokemonEquipoMovimientosController.assignMovimientosToPokemonEquipo);

    app.use("/pokemonEquipoMovimientos", router);
};