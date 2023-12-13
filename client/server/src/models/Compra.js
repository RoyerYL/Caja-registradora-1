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
      fecha:{
         type:DataTypes.DATE,
         allowNull:false
      },
      ArticuloId:{
         type:DataTypes.STRING,
      },
   }, { timestamps: false });
};
