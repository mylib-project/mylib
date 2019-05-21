'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookRent = sequelize.define('bookRent', {
    employeeId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    returnDate: DataTypes.DATE,
    status: DataTypes.STRING,
    denda: DataTypes.INTEGER,
  }, {});
  bookRent.associate = function(models) {
    // associations can be defined here
  };
  return bookRent;
};