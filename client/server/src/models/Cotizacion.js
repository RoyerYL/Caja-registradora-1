const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Cotizacion', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      cotizacionMep: {
         type: DataTypes.DECIMAL(10,2),
         allowNull: false,
      },
      cotizacionBlue: {
         type: DataTypes.DECIMAL(10,2),
         allowNull: false,
      },
   }, { timestamps: false });
};
