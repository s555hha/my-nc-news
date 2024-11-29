const db = require("../db/connection")

function selectArticleById(article_id) {
  return (
    db
      .query(
        `SELECT articles.*, 
        COUNT(comments.body)::INT AS comment_count 
        FROM articles 
        LEFT JOIN comments 
        ON articles.article_id=comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id`,
        [article_id]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            message: "article does not exist",
          })
        } else {
          return rows[0]
        }
      })
  )
}
function selectAllArticles(sort_by = "created_at", order_by = "DESC", topic) {
  const validSortBy = [
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "comment_count",
  ]

  const validOrderBy = ["DESC", "ASC"]

  const queryValues = []

  let sqlQuery = `SELECT 
  articles.article_id,
  articles.title,
  articles.topic,
  articles.author,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT (comments.body) ::INT AS comment_count
  FROM articles
  LEFT JOIN comments
  ON articles.article_id = comments.article_id `

  if (topic) {
    sqlQuery += ` WHERE articles.topic = $1`
    queryValues.push(topic)
  }

  if (!validOrderBy.includes(order_by) || !validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, message: "Bad request" })
  }

  sqlQuery += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order_by}`

  return db.query(sqlQuery, queryValues).then(({ rows }) => {
    return rows
  })
}

function updateSelectedArticle(article_id, inc_votes) {
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      message: "Bad request",
    })
  }
  return db
    .query(
      `UPDATE articles
  SET votes = $1
  WHERE article_id = $2
  RETURNING * `,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0]
    })
}

module.exports = { selectArticleById, selectAllArticles, updateSelectedArticle }
