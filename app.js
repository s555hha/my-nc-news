const express = require("express")
const cors = require('cors');

const apiRouter = require("./routes/api-router")


const {
  notFoundErrorHandler,
  psqlErrorHandler,
  customErrorsHandler,
  serverErrorHandler,
} = require("./error-handler")

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api', apiRouter)
app.use(psqlErrorHandler)
app.use(customErrorsHandler)
app.use(serverErrorHandler)
app.all("*", notFoundErrorHandler)

module.exports = app
