const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Tipo = sequelize.define(
        'Tipo',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, 
            },
        },
    );
    return Tipo;
};