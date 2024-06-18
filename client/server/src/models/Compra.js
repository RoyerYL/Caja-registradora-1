const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Compra', {
      id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement: true
      },
      cantidad:{
         type:DataTypes.DECIMAL(10, 2),
         allowNull:false,
      },
      subTotal:{
         type:DataTypes.DECIMAL(10, 2)
      },
      fecha:{
         type:DataTypes.DATE,
         allowNull:false
      },
      TicketId:{
         type:DataTypes.INTEGER
      }, 
      articles:{
         type:DataTypes.JSON
      },
      ArticuloId:{
         type:DataTypes.STRING,
      },
   }, { timestamps: false });
};
