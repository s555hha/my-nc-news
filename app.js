const express = require("express")
const {
  notFoundErrorHandler,
  psqlErrorHandler,
  customErrorsHandler,
  serverErrorHandler,
} = require("./error-handler")
const { getApi, getTopics } = require("./controllers/nc-news-controller")
const {
  getArticleById,
  getAllArticles,
} = require("./controllers/articles.controller")

const { getCommentsByArticleId, postCommentOnArticle } = require("./controllers/comments.controller")

const app = express()
app.use(express.json())

app.get("/api", getApi)

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postCommentOnArticle)

app.all("*", notFoundErrorHandler)
app.use(psqlErrorHandler)
app.use(customErrorsHandler)
app.use(serverErrorHandler)


module.exports = app
