const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Caja', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      precioInicial: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: false,
      },
      extracciones:{
         type:DataTypes.DECIMAL(10,2)
      },
      ingreso:{
         type:DataTypes.DECIMAL(10,2)
      },
      precioFinal: {
         type: DataTypes.DECIMAL(10, 2),
      },
      precioFinalCaja: {
         type: DataTypes.DECIMAL(10, 2),
      },
      fechaApertura:{
         type:DataTypes.DATE,
         allowNull:false
      },
      fechaCierre:{
         type:DataTypes.DATE

      },
      apertura:{
         type:DataTypes.BOOLEAN,
         defaultValue:true
      }

   }, { timestamps: false });
};
