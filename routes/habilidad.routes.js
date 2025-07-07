const habilidadController = require("../controllers/habilidad.controller.js");

module.exports = app => {
    const router = require("express").Router();

    // Ruta para crear una habilidad
    router.post("/", habilidadController.createHabilidad);

    // Ruta para asignar una habilidad a un Pokémon
    router.post("/:pokemonId/assign", habilidadController.assignHabilidadToPokemon);

    // Ruta para listar habilidades de un Pokémon
    router.get("/:pokemonId", habilidadController.listHabilidadesForPokemon);

    app.use("/habilidades", router);
};