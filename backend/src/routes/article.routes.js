const express = require('express');
const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/article.controller');

const router = express.Router();

router.post('/article/', createArticle);
router.get('/articles/', getArticles);
router.get('/article/:id/', getArticle);
router.patch('/article/:id/', updateArticle);
router.delete('/article/:id/', deleteArticle);

module.exports = router;
