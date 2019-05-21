'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookTag = sequelize.define('bookTag', {
    tagId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  bookTag.associate = function(models) {
    // associations can be defined here
  };
  return bookTag;
};