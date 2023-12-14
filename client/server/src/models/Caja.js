const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Caja', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      precioInicial: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      precioFinal: {
         type: DataTypes.INTEGER,
      },
   }, { timestamps: false });
};
