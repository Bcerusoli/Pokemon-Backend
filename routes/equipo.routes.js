const { requireUser } = require("../middlewares/requires-user.js");
const equipoController = require("../controllers/equipo.controller.js");

module.exports = app => {
    const router = require("express").Router();

    // Crear un nuevo equipo
    router.post("/", requireUser, equipoController.createEquipo);

    // Obtener todos los equipos de un usuario
    router.get("/", requireUser, equipoController.listEquipos);

    // Obtener un equipo específico por ID
    router.get("/:id", requireUser, equipoController.getEquipoById);

    app.use("/equipos", router);
};