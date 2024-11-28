const {
  selectCommentsByArticleId,
  addComment,
  removeSelectedComment,
} = require("../models/comments.model")

const checkExists = require("../models/checkIfExists")

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
// function deleteComment(req, res, next) {
//   const { comment_id } = req.params
//   const promises = [removeSelectedComment(comment_id)]
//   if (comment_id) {
//     promises.push(checkExists("comments", "comment_id", comment_id))
//   }
//   Promise.all(promises)
//     .then(() => {
//       res.status(204).send()
//     })
//     .catch((err) => {
//       next(err)
//     })
// }

//will return later and try and fix not working properly only works occasionally unsure why

function deleteComment(req, res, next) {
  const { comment_id } = req.params
  const promises = [
    checkExists("comments", "comment_id", comment_id),
    removeSelectedComment(comment_id),
  ]
  Promise.all(promises)
    .then(() => {
      res.status(204).send()
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = { getCommentsByArticleId, postCommentOnArticle, deleteComment }
