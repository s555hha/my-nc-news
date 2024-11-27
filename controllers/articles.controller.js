const {
  selectArticleById,
  selectAllArticles,
  updateSelectedArticle,
} = require("../models/articles.models")

const checkArticleExists = require("../models/checkIfExists")

function getArticleById(req, res, next) {
  const { article_id } = req.params
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article })
    })
    .catch((err) => {
      next(err)
    })
}
function getAllArticles(req, res, next) {
  selectAllArticles()
    .then((articles) => {
      res.status(200).send({ articles })
    })
    .catch((err) => {
      next(err)
    })
}
function updateArticle(req, res, next) {
  const { article_id } = req.params
  const { inc_votes } = req.body
  const promises = [updateSelectedArticle(article_id, inc_votes)]
  if (article_id) {
    promises.push(checkArticleExists(article_id))
  }
  Promise.all(promises)
    .then(([article]) => {
      res.status(201).send({ article })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = { getArticleById, getAllArticles, updateArticle }
