const { requireAdmin } = require("../middlewares/requiereAdmin.js");
const pokemonController = require("../controllers/pokemon.controller.js");

module.exports = app => {
    const router = require("express").Router();

    // Obtener todos los Pokémon
    router.get("/", pokemonController.listPokemons);

    // Obtener un Pokémon específico por ID
    router.get("/:id", pokemonController.getPokemonById);

    // Crear un nuevo Pokémon (solo administradores)
    router.post("/", requireAdmin, pokemonController.createPokemon);

    // Actualizar un Pokémon por ID (solo administradores)
    router.put("/:id", requireAdmin, pokemonController.updatePokemon);

    // Eliminar un Pokémon por ID (solo administradores)
    router.delete("/:id", requireAdmin, pokemonController.deletePokemon);

    app.use("/pokemones", router);
};