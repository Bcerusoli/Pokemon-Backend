const pokemonTiposController = require("../controllers/pokemonTipos.controller.js");

module.exports = app => {
    const router = require("express").Router();

    // Ruta para asignar un Tipo a un Pokémon
    router.post("/:pokemonId/assign", pokemonTiposController.assignTipoToPokemon);

    // Ruta para listar los Tipos de un Pokémon
    router.get("/:pokemonId", pokemonTiposController.listTiposForPokemon);

    app.use("/pokemonTipos", router);
};