'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    customerId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  Favourite.associate = function(models) {
    // associations can be defined here
  };
  return Favourite;
};