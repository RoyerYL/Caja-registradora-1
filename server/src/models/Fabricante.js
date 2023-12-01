const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Fabricante', {
      id:{
         type:DataTypes.STRING,
         allowNull:false,
         primaryKey:true
      },
      nameCategoria:{
         type:DataTypes.STRING,
         allowNull:false,
      }
      
   }, { timestamps: false });
};
