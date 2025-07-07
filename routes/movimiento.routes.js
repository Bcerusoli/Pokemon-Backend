const { requireAdmin } = require("../middlewares/requiereAdmin.js");
const movimientoController = require("../controllers/movimiento.controller.js");

module.exports = app => {
    const router = require("express").Router();

    // Obtener todos los movimientos
    router.get("/", movimientoController.listMovimientos);

    // Obtener un movimiento específico por ID
    router.get("/:id", movimientoController.getMovimientoById);

    // Crear un nuevo movimiento (solo administradores)
    router.post("/", requireAdmin, movimientoController.createMovimiento);

    // Actualizar un movimiento por ID (solo administradores)
    router.put("/:id", requireAdmin, movimientoController.updateMovimiento);

    // Eliminar un movimiento por ID (solo administradores)
    router.delete("/:id", requireAdmin, movimientoController.deleteMovimiento);

    // Asociar un movimiento a un Pokémon (solo administradores)
    router.post("/:id/asociar", requireAdmin, movimientoController.asociarMovimientoAPokemon);

    app.use("/movimientos", router);
};