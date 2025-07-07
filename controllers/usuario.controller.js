const db = require("../models/");

exports.listUsers = async (req, res) => {
    try {
        const users = await db.usuario.findAll({
            attributes: ['id', 'email', 'nombreUsuario', 'role'],
        });
        res.send(users);
    } catch (error) {
        console.error("Error listing users:", error);
        res.status(500).send({ message: "Error al listar usuarios" });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.usuario.findByPk(id, {
            attributes: ['id', 'email', 'nombreUsuario', 'role'],
        });
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        res.send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ message: "Error al obtener usuario" });
    }
};

exports.updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'user'].includes(role)) {
        return res.status(400).send({ message: "Rol inválido" });
    }

    try {
        const user = await db.usuario.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        user.role = role;
        await user.save();

        res.send({ message: `Rol actualizado a ${role} para el usuario con ID ${id}` });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).send({ message: "Error al actualizar el rol del usuario" });
    }
};
exports.updateUserPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).send({ message: "La contraseña es requerida" });
    }

    try {
        const user = await db.usuario.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        const hashedPassword = require("../utils/auth.utils").generatePassword(password);
        user.password = hashedPassword;
        await user.save();

        res.send({ message: `Contraseña actualizada para el usuario con ID ${id}` });
    } catch (error) {
        console.error("Error updating user password:", error);
        res.status(500).send({ message: "Error al actualizar la contraseña del usuario" });
    }
};