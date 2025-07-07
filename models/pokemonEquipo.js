const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const PokemonEquipo = sequelize.define(
        'PokemonEquipo',
        {
             id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            evHP: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            evAtaque: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            evDefensa: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            evAtaqueEspecial: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            evDefensaEspecial: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            evVelocidad: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            ivHP: {
                type: DataTypes.INTEGER,
                defaultValue: 31,
            },
            ivAtaque: {
                type: DataTypes.INTEGER,
                defaultValue: 31,
            },
            ivDefensa: {
                type: DataTypes.INTEGER,
                defaultValue: 31,
            },
            ivAtaqueEspecial: {
                type: DataTypes.INTEGER,
                defaultValue: 31,
            },
            ivDefensaEspecial: {
                type: DataTypes.INTEGER,
                defaultValue: 31,
            },
            ivVelocidad: {
                type: DataTypes.INTEGER,
                defaultValue: 31,
            },
            apodo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
    );
    return PokemonEquipo;
};