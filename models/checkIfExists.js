const format = require('pg-format')
const db = require("../db/connection")

function checkExists(table, column, value){
    const queryString = format(
      `SELECT * 
      FROM %I 
      WHERE %I = $1`,
      table,
      column
    );
  
    return db.query(queryString, [value])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: 'Sorry Not Found',
        });
      }
    });
  };
  module.exports = checkExists
// const db = require("../db/connection")

// function checkArticleExists(article_id) {
//   return db
//     .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
//     .then(({ rows }) => {
//       if (rows.length === 0) {
//         return Promise.reject({
//           status: 404,
//           msg: "Sorry Not Found",
//         })
//       }
//     })
// }
// function checkCommentsExists(comment_id) {
//     return db
//       .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
//       .then(({ rows }) => {
//         if (rows.length === 0) {
//           return Promise.reject({
//             status: 404,
//             msg: "Sorry Not Found",
//           })
//         }
//       })
//   }

// module.exports = {checkArticleExists, checkCommentsExists}
