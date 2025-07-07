const { requireAdmin } = require("../middlewares/requiereAdmin.js");
const tipoController = require("../controllers/tipo.controller.js");

module.exports = app => {
    const router = require("express").Router();

    
    router.get("/", tipoController.listTipos);

    
    router.get("/:id", tipoController.getTipoById);

    
    router.post("/", requireAdmin, tipoController.createTipo);

    
    router.put("/:id", requireAdmin, tipoController.updateTipo);

   
    router.delete("/:id", requireAdmin, tipoController.deleteTipo);

    app.use("/tipos", router);
};