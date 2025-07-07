const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Equipo = sequelize.define(
        'Equipo',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
    );
    return Equipo;
};