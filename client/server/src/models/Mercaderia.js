const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Mercaderia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comentarios: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        articulos: {
            type: DataTypes.JSONB, // Puedes ajustar el tipo de datos según tus necesidades
            allowNull: false,
        },
    }, { timestamps: false });
};
