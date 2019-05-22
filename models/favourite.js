'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    customerId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  Favourite.associate = function(models) {
    // associations can be defined here
    Favourite.belongsTo(models.Customer, {foreignKey: 'customerId'})
    Favourite.belongsTo(models.Book,{foreignKey: 'bookId'})
  };
  return Favourite;
};