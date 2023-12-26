const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Ticket', {
      id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement: true
      },
      valorTotal:{
         type:DataTypes.DECIMAL(10, 2),
         allowNull:false,
      },
      fecha:{
         type:DataTypes.DATE,
         allowNull:false
      },
      descuento:{
         type:DataTypes.INTEGER,
         defaultValue:0
      },
      VendedorId:{
         type:DataTypes.INTEGER
      },
      CajaId:{
         type:DataTypes.INTEGER,
         allowNull:true
      }
   }, { timestamps: false });
};
