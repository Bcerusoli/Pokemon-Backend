const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Naturaleza = sequelize.define(
        'Naturaleza',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            efecto: {
                type: DataTypes.JSON, 
                allowNull: false,
            },
        },
    );
    return Naturaleza;
};