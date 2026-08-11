const express = require('express');
const {
  getCommentsAnalytics
} = require('../controllers/analytic.controller');

const router = express.Router();

router.get('/analytic/comments/', getCommentsAnalytics);

module.exports = router;
