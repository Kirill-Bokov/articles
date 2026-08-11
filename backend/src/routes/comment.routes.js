const express = require('express');
const {
  createComment,
  getComment,
  getComments,
  updateComment,
  deleteComment
} = require('../controllers/comment.controller');

const router = express.Router();

router.post('/article/:id/comment/', createComment);
router.get('/article/:id/comment/:commentId/', getComment);
router.get('/article/:id/comments/', getComments);
router.patch('/article/:id/comment/:commentId/', updateComment);
router.delete('/article/:id/comment/:commentId/', deleteComment);

module.exports = router;
