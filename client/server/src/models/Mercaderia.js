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
        subTotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        descuento: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        iva: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        precepciones: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, { timestamps: false });
};
