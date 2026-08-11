const express = require('express');
const { sequelize } = require('../models');

const articleRoutes = require('./routes/article.routes');
//const commentRoutes = require('./routes/comment.routes');
//const analyticRoutes = require('./routes/analytic.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(articleRoutes);
//app.use(commentRoutes);
//app.use(analyticRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

startServer();
