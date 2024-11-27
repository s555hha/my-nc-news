const {
  selectCommentsByArticleId,
  addComment,
} = require("../models/comments.model")

const checkCommentsExists = require("../models/checkIfExists")
const checkArticleExists = require("../models/checkIfExists")

function getCommentsByArticleId(req, res, next) {
  const { article_id } = req.params
  const promises = [selectCommentsByArticleId(article_id)]
  if (article_id) {
    promises.push(checkArticleExists(article_id))
  }
  Promise.all(promises)
    .then(([comments]) => { 
        console.log(comments);
             
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

