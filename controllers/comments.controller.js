const {
  selectCommentsByArticleId,
  addComment,
} = require("../models/comments.model")

function getCommentsByArticleId(req, res, next) {
  const { article_id } = req.params
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments })
    })
    .catch((err) => {
      next(err)
    })
}

function postCommentOnArticle(req, res, next) { 
  const { article_id } = req.params
  const { username, body } = req.body
  addComment(article_id, username, body)
  .then((comment) => {
      res.status(201).send({ comment })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = { getCommentsByArticleId, postCommentOnArticle }

