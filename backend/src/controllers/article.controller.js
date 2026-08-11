const { Article } = require('../../models');
const { ValidationError } = require('sequelize');

function validateId(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

function validateArticleData(data, partial = false) {
  const errors = {};

  if (!partial || data.title !== undefined) {
    if (typeof data.title !== 'string' || !data.title.trim()) {
      errors.title = 'Title must be a non-empty string';
    }
  }

  if (!partial || data.content !== undefined) {
    if (typeof data.content !== 'string' || !data.content.trim()) {
      errors.content = 'Content must be a non-empty string';
    }
  }

  return errors;
}

async function createArticle(req, res) {
  try {
    const { title, content } = req.body;

    const errors = validateArticleData({ title, content });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

    const article = await Article.create({
      title: title.trim(),
      content: content.trim()
    });

    return res.status(201).json(article);
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

async function getArticles(req, res) {
  try {
    const articles = await Article.findAll();

    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function getArticle(req, res) {
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

    return res.status(200).json(article);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function updateArticle(req, res) {
  try {
    const { id } = req.params;

    if (!validateId(id)) {
      return res.status(400).json({
        message: 'Invalid article ID'
      });
    }

    const errors = validateArticleData(req.body, true);

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

    const updates = {};

    if (req.body.title !== undefined) {
      updates.title = req.body.title.trim();
    }

    if (req.body.content !== undefined) {
      updates.content = req.body.content.trim();
    }

    await article.update(updates);

    return res.status(200).json(article);
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

async function deleteArticle(req, res) {
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

    await article.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
};
