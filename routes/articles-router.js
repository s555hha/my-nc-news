const articlesRouter = require('express').Router();

const {
    getArticleById,
    getAllArticles,
    updateArticle,
    getCommentsByArticleId,
    postCommentOnArticle
  } = require("../controllers/articles.controller")

articlesRouter.route('/')
    .get(getAllArticles)
    .post(updateArticle);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(updateArticle)

  articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentOnArticle)



module.exports = articlesRouter;