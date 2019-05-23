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
    bookRent.belongsTo(models.Employee,{foreignKey: "employeeId"})
    bookRent.belongsTo(models.Customer,{foreignKey: "customerId"})
    bookRent.belongsTo(models.Book,{foreignKey: "bookId"})
  };
  return bookRent;
};