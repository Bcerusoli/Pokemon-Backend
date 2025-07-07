const { requireAdmin } = require("../middlewares/requiereAdmin.js");
const { requireUser } = require("../middlewares/requires-user.js");
const usuarioController = require("../controllers/usuario.controller.js");

module.exports = app => {
    const router = require("express").Router();

    
    router.get("/", requireAdmin, usuarioController.listUsers);

    
    router.get("/:id", requireAdmin, usuarioController.getUserById);

    
    router.put("/:id/role", requireAdmin, usuarioController.updateUserRole);

    router.put("/:id/password", requireAdmin, usuarioController.updateUserPassword);



    app.use("/usuarios", router);
};