const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Vendedor', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      vendedor: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   }, { timestamps: false });
};
