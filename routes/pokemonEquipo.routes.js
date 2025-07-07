module.exports = app => {
    const router = require("express").Router();
    const pokemonEquipoController = require("../controllers/pokemonEquipo.controller.js");

    // Añadir un Pokémon al equipo
    router.post("/", pokemonEquipoController.addPokemonToEquipo);

    // Listar los Pokémon en un equipo
    router.get("/:equipoId", pokemonEquipoController.listPokemonInEquipo);

    // Obtener los detalles de un Pokémon en el equipo
    router.get("/:id/details", pokemonEquipoController.getPokemonDetails);

    // Actualizar el apodo del Pokémon
    router.put("/:id/nickname", pokemonEquipoController.updateNickname);

    // Eliminar un Pokémon del equipo
    router.delete("/:id", pokemonEquipoController.removePokemonFromEquipo);

    router.put("/:id/item", pokemonEquipoController.assignItemToPokemon);

    router.put("/:id/habilidad", pokemonEquipoController.assignHabilidadToPokemonEquipo);

    app.use("/pokemonEquipos", router);
};