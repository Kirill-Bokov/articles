const { Article } = require('../../models');

async function createArticle(req, res) {
  try {
    const { title, content } = req.body;

    const article = await Article.create({
      title,
      content
    });

    res.status(201).json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function getArticles(req, res) {
  try {
    const articles = await Article.findAll();

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function getArticle(req, res) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    await article.update({
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content })
    });

    res.status(200).json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function deleteArticle(req, res) {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    await article.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
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