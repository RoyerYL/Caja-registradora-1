const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Validador', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      validador: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   }, { timestamps: false });
};
