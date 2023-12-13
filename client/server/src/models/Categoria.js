const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Categoria', {
      id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement: true
      },
      nameCategoria:{
         type:DataTypes.STRING,
         allowNull:false,
      }
      
   }, { timestamps: false });
};
