const sequelize = require('./sequelize');
const Article = require('./Article');
const Comment = require('./Comment');

Article.hasMany(Comment, {
  foreignKey: 'articleId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Article, {
  foreignKey: 'articleId'
});

module.exports = {
  sequelize,
  Article,
  Comment
};