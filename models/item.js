const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Item = sequelize.define(
        'Item',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imagen: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
    );
    return Item;
};