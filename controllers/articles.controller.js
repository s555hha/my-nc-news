const articles = require("../db/data/test-data/articles")
const {
  selectArticleById,
  selectAllArticles,
  updateSelectedArticle,
} = require("../models/articles.models")

const checkExists = require("../models/checkIfExists")

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
  const { sort_by, order_by, topic } = req.query

  const promises = [selectAllArticles(sort_by, order_by, topic)]

  if (topic) {
    promises.push(checkExists("topics", "slug", topic))
  }

  Promise.all(promises)
    .then(([articles]) => {
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
    promises.push(checkExists("articles", "article_id", article_id))
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
