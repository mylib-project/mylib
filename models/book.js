'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    publicationYear: DataTypes.DATE,
    numberOfPage: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    cover: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
    Book.hasMany(models.Favourite, {foreignKey:'bookId'})

    Book.hasMany(models.bookRent,{foreignKey: "bookId"})
    Book.hasMany(models.bookTag,{foreignKey: "bookId"})
  };
  return Book;
};