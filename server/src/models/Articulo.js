const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Articulo', {
      id:{
         type:DataTypes.INTEGER,
         allowNull:false,
         primaryKey:true
      },
      name:{
         type:DataTypes.STRING,
         allowNull:false,
      },
      codBarras:{
         type:DataTypes.STRING,
         allowNull:false
      },
      cantidad:{
         type:DataTypes.INTEGER,
         allowNull:false,
      }

   }, { timestamps: false });
};
