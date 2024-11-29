const removeSelectedComment = require("../models/comments.model")

function deleteComment(req, res, next) {
  const { comment_id } = req.params
    removeSelectedComment(comment_id)
    .then(() => {
      res.status(204).send()
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = deleteComment
