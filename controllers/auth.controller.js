const db = require("../models/");
const { generateAuthToken, generatePassword } = require("../utils/auth.utils");
exports.login = async (req, res) => {
    const { nombreUsuario, password } = req.body;
    if (!nombreUsuario || !password) {
        return res.status(400).send({ message: "El nombre de usuario y la contraseña son requeridos" });
    }
    const usuario = await db.usuario.findOne({
        where: {
            nombreUsuario: nombreUsuario,
        },
    });
    if (!usuario) {
        return res.status(401).send({ message: "Nombre de usuario o contraseña incorrectos" });
    }
    const hashedPassword = generatePassword(password);
    if (usuario.password !== hashedPassword) {
        return res.status(401).send({ message: "Nombre de usuario o contraseña incorrectos" });
    }
    console.log("usuario verificado");
    try {
        const authToken = await db.authToken.create({
            usuarioId: usuario.id,
            token: generateAuthToken(usuario.nombreUsuario),
        });
        console.log("authToken", authToken);

        res.send({
            token: authToken.token,
            nombreUsuario: usuario.nombreUsuario,
            role: usuario.role,
        });
    } catch (error) {
        console.error("Error creating auth token:", error);
        return res.status(500).send({ message: "Error al crear el token de autenticación" });
    }
};
exports.register = async (req, res) => {
    const { email, password, nombreUsuario, role } = req.body; 
    if (!email || !password || !nombreUsuario) {
        return res.status(400).send({ message: "El email, la contraseña y el nombre de usuario son requeridos" });
    }
    const existingUser = await db.usuario.findOne({
        where: {
            nombreUsuario: nombreUsuario,
        },
    });
    if (existingUser) {
        return res.status(400).send({ message: "El nombre de usuario ya existe" });
    }
    const hashedPassword = generatePassword(password);
    try {
        const usuario = await db.usuario.create({
            email: email,
            password: hashedPassword,
            nombreUsuario: nombreUsuario,
            role: role || 'user', 
        });
        res.send({
            id: usuario.id,
            email: usuario.email,
            nombreUsuario: usuario.nombreUsuario,
            role: usuario.role,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send({ message: "Error al crear usuario" });
    }
};
exports.me = async (req, res) => {
    const usuario = res.locals.usuario;

    res.send({
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        role: usuario.role,
        
    });
}