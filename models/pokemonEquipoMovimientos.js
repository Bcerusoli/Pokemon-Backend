// filepath: c:\Users\HP\Music\web-2-2025-1-main\apinode\models\pokemonEquipoMovimientos.js
const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const PokemonEquipoMovimientos = sequelize.define("PokemonEquipoMovimientos", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pokemonEquipoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "PokemonEquipos", 
                key: "id",
            },
        },
        movimientoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Movimientos", 
                key: "id",
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });

    return PokemonEquipoMovimientos;
};