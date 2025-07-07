const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Usuario = sequelize.define(
        'Usuario',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nombreUsuario: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, 
            },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                defaultValue: 'user',
            },
        },
    );
    return Usuario;
};