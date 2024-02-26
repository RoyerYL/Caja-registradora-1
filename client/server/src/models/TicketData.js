const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('TicketData', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      direccion: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      zona: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      celular: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      cuit:{
        type:DataTypes.STRING,
        defaultValue:"00-00000000-0",
      }
   }, { timestamps: false });
};
