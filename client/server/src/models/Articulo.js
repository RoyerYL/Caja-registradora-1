const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Articulo', {
      id:{
         type:DataTypes.STRING,
         allowNull:false,
         primaryKey:true
      },
      name:{
         type:DataTypes.STRING,
         allowNull:false,
      },
      stock:{
         type:DataTypes.DECIMAL(10, 2),
         allowNull:false
      },
      stockMin:{
         type:DataTypes.DECIMAL(10, 2),
         defaultValue:0.00,
      },
      costoPeso:{
         type: DataTypes.DECIMAL(10, 2),
         allowNull:false,
      },
      costoDolar:{
         type: DataTypes.DECIMAL(10, 2),
         allowNull:false,
      },
      
      iva:{
         type:DataTypes.INTEGER,
         allowNull:false,
      },
      ganancia:{
         type:DataTypes.DOUBLE,
         allowNull:false,
      },
      precioVenta:{
         type: DataTypes.DECIMAL(10, 2),
         defaultValue:0.00
      },
      ganancia_2:{
         type: DataTypes.DECIMAL(10, 2),
         defaultValue:0.00,
      },
      precioVenta_2:{
         type: DataTypes.DECIMAL(10, 2),
         defaultValue:0.00,
      },
      descripcion:{
         type:DataTypes.TEXT,
         defaultValue:"",
      },
      img:{
         type:DataTypes.STRING,
         defaultValue:"",
      },
      activo:{
         type:DataTypes.BOOLEAN,
         defaultValue:true,
      },
      CategoriaId: {
         type: DataTypes.INTEGER,
         allowNull: true, // Permite que la clave foránea sea nula
       },
      ProvedorId: {
         type: DataTypes.INTEGER,
         allowNull: true, // Permite que la clave foránea sea nula
       },
   }, { timestamps: false });
};
