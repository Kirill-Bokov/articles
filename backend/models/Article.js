const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'articles',
  timestamps: true,
  underscored: true
});

module.exports = Article;