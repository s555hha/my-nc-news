const db = require("../db/connection")

function selectCommentsByArticleId(article_id) {
  return db
    .query(
      `SELECT * FROM comments 
    WHERE article_id = $1 
    ORDER BY created_at DESC `,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: "article does not exist",
        })
      } else {
        return rows
      }
    })
}
function addComment(article_id, username, body) {
  if (!username || !body) {
    return Promise.reject({
      status: 404,
      message: "missing information",
    })
  }
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) 
    VALUES ($1, $2, $3) RETURNING * `,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0]
    })
}

function removeSelectedComment(comment_id) {
  return db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
}

module.exports = {
  selectCommentsByArticleId,
  addComment,
  removeSelectedComment,
}
