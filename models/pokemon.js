const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Pokemon = sequelize.define(
        'Pokemon',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imagen: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            baseHP: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            baseAtaque: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            baseDefensa: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            baseAtaqueEspecial: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            baseDefensaEspecial: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            baseVelocidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
    );
    return Pokemon;
};