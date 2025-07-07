const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Habilidad = sequelize.define(
        'Habilidad',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
    );
    return Habilidad;
};