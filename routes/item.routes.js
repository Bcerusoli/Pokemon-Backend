const { requireAdmin } = require("../middlewares/requiereAdmin.js");
const itemController = require("../controllers/item.controller.js");

module.exports = app => {
    const router = require("express").Router();

    // Obtener todos los ítems
    router.get("/", itemController.listItems);

    // Obtener un ítem específico por ID
    router.get("/:id", itemController.getItemById);

    // Crear un nuevo ítem (solo administradores)
    router.post("/", requireAdmin, itemController.createItem);

    // Actualizar un ítem por ID (solo administradores)
    router.put("/:id", requireAdmin, itemController.updateItem);

    // Eliminar un ítem por ID (solo administradores)
    router.delete("/:id", requireAdmin, itemController.deleteItem);

    app.use("/items", router);
};