const db = require("../db/connection")

function selectArticleById(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
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
}
function selectAllArticles() {
  return db
    .query(
      `SELECT 
    articles.article_id,
    articles.title,
    articles.topic,
    articles.author,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT (*) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`
    )
    .then(({ rows }) => {
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
