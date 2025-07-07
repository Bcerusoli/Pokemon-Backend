const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Movimiento = sequelize.define(
        'Movimiento',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            poder: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            categoria: {
                type: DataTypes.ENUM('físico', 'especial', 'estado'),
                allowNull: false,
            },
        },
    );
    return Movimiento;
};