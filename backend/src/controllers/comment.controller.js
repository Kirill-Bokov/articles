const { Article, Comment } = require('../../models');
const { ValidationError } = require('sequelize');

function validateId(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

function validateCommentData(data, partial = false) {
  const errors = {};

  if (!partial || data.content !== undefined) {
    if (typeof data.content !== 'string' || !data.content.trim()) {
      errors.content = 'Content must be a non-empty string';
    }
  }

  return errors;
}

async function createComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!validateId(id)) {
      return res.status(400).json({
        message: 'Invalid article ID'
      });
    }

    const errors = validateCommentData({ content });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const comment = await Comment.create({
      content: content.trim(),
      articleId: id
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(({ path, message }) => ({
          field: path,
          message
        }))
      });
    }

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function getComment(req, res) {
  try {
    const { id, commentId } = req.params;

    if (!validateId(id)) {
      return res.status(400).json({
        message: 'Invalid article ID'
      });
    }

    if (!validateId(commentId)) {
      return res.status(400).json({
        message: 'Invalid comment ID'
      });
    }

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

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function getComments(req, res) {
  try {
    const { id } = req.params;

    if (!validateId(id)) {
      return res.status(400).json({
        message: 'Invalid article ID'
      });
    }

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const comments = await Comment.findAll({
      where: {
        articleId: id
      },
      order: [['createdAt', 'ASC']]
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function updateComment(req, res) {
  try {
    const { id, commentId } = req.params;
    const { content } = req.body;

    if (!validateId(id)) {
      return res.status(400).json({
        message: 'Invalid article ID'
      });
    }

    if (!validateId(commentId)) {
      return res.status(400).json({
        message: 'Invalid comment ID'
      });
    }

    const errors = validateCommentData({ content }, true);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

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
      await comment.update({
        content: content.trim()
      });
    }

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(({ path, message }) => ({
          field: path,
          message
        }))
      });
    }

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function deleteComment(req, res) {
  try {
    const { id, commentId } = req.params;

    if (!validateId(id)) {
      return res.status(400).json({
        message: 'Invalid article ID'
      });
    }

    if (!validateId(commentId)) {
      return res.status(400).json({
        message: 'Invalid comment ID'
      });
    }

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

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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
