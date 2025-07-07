const db = require("../models");

exports.requireAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); 
    if (!authHeader) {
        return res.status(401).send({ message: "No autorizado" });
    }
    const splitted = authHeader.split(" ");
    if (splitted.length !== 2 || splitted[0] !== "Bearer") {
        return res.status(401).send({ message: "No autorizado" });
    }
    const token = splitted[1];
    console.log("Token:", token); 

    const authToken = await db.authToken.findOne({
        where: {
            token: token,
        },
    });
    console.log("AuthToken:", authToken); 
    if (!authToken) {
        return res.status(401).send({ message: "No autorizado" });
    }
    const usuario = await db.usuario.findOne({
        where: {
            id: authToken.usuarioId,
        },
    });
    console.log("Usuario:", usuario);
    if (!usuario || usuario.role !== 'admin') {
        return res.status(403).send({ message: "Acceso denegado" });
    }
    res.locals.usuario = usuario;

    next();
};

// Middleware adicional para verificar acceso a páginas de administrador
exports.checkAdmin = async (req, res, next) => {
    const usuario = res.locals.usuario;
    if (!usuario) {
        return res.status(401).send({ message: "No autorizado" });
    }
    if (usuario.role !== 'admin') {
        return res.status(403).send({ message: "Acceso denegado" });
    }

    next();
};