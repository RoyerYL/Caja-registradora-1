const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Provedor', {
      id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement: true
      },
      razonSocial:{
         type:DataTypes.INTEGER,
         allowNull:false,
      },
      cuit:{
         type:DataTypes.INTEGER,
         defaultValue:0
      },
      nombreComercial:{
         type:DataTypes.STRING,
         allowNull:false,
      },
      direccion:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      provincia:{
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
      personContacto:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      comentarios:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      
   }, { timestamps: false });
};
