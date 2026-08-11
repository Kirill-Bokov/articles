const { Op } = require('sequelize');
const { Article, Comment } = require('../../models');

async function getCommentsAnalytics(req, res) {
  try {
    const { dateFrom, dateTo } = req.query;

    if (!dateFrom || !dateTo) {
      return res.status(400).json({
        message: 'dateFrom and dateTo are required'
      });
    }

    const from = new Date(dateFrom);
    const to = new Date(dateTo);

    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      return res.status(400).json({
        message: 'Invalid date format'
      });
    }

    if (from > to) {
      return res.status(400).json({
        message: 'dateFrom must be less than or equal to dateTo'
      });
    }

    const comments = await Comment.findAll({
      where: {
        createdAt: {
          [Op.gte]: from,
          [Op.lte]: to
        }
      },
      include: [
        {
          model: Article,
          attributes: ['id', 'title']
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    const grouped = comments.reduce((groups, comment) => {
      const articleId = comment.articleId;

      if (!groups[articleId]) {
        groups[articleId] = {
          articleId,
          articleTitle: comment.Article.title,
          comments: []
        };
      }

      groups[articleId].comments.push({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      });

      return groups;
    }, {});

    return res.status(200).json(Object.values(grouped));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

module.exports = {
  getCommentsAnalytics
};
