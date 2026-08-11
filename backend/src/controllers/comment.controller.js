const { Article, Comment } = require('../../models');

async function createComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const comment = await Comment.create({
      content,
      articleId: id
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function getComment(req, res) {
  try {
    const { id, commentId } = req.params;

    const comment = await Comment.findOne({
      where: {
        id: commentId,
        articleId: id
      }
    });

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function getComments(req, res) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const comments = await Comment.findAll({
      where: {
        articleId: id
      }
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function updateComment(req, res) {
  try {
    const { id, commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findOne({
      where: {
        id: commentId,
        articleId: id
      }
    });

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    if (content !== undefined) {
      await comment.update({ content });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function deleteComment(req, res) {
  try {
    const { id, commentId } = req.params;

    const comment = await Comment.findOne({
      where: {
        id: commentId,
        articleId: id
      }
    });

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    await comment.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

module.exports = {
  createComment,
  getComment,
  getComments,
  updateComment,
  deleteComment
};