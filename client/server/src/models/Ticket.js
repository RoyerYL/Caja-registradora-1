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
   }, { timestamps: false });
};
