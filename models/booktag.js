'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookTag = sequelize.define('bookTag', {
    tagId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  bookTag.associate = function(models) {
    // associations can be defined here
    bookTag.belongsTo(models.Book, {foreignKey: 'bookId'})
    bookTag.belongsTo(models.Tag, {foreignKey: 'tagId'})
  };
  return bookTag;
};