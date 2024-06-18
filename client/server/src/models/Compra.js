const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Compra', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      cantidad: {
         type: DataTypes.DECIMAL(10, 2),
         defaultValue: null,
      },
      subTotal: {
         type: DataTypes.DECIMAL(10, 2),
         defaultValue: null,
      },
      fecha: {
         type: DataTypes.DATE,
         allowNull: false
      },
      TicketId: {
         type: DataTypes.INTEGER
      },
      articles: {
         type: DataTypes.JSON
      }
   }, { timestamps: false });
};
