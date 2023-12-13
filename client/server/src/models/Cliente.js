const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Cliente', {
      id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement: true
      },
      razonSocial:{
         type:DataTypes.STRING,
         allowNull:false,
      },
      nombre:{
         type:DataTypes.STRING,
         allowNull:false,
      },
      dni:{
         type:DataTypes.INTEGER,
         defaultValue:0
      },
      direccion:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      zona:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      localidad:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      telefono1:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      telefono2:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      telefono3:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      email:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      comentarios:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      
   }, { timestamps: false });
};
