const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  articleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'article_id'
  }
}, {
  tableName: 'comments',
  timestamps: true,
  underscored: true
});

module.exports = Comment;