const express = require("express");
const {notFoundErrorHandler, psqlErrorHandler, customErrorsHandler, serverErrorHandler} = require("./error-handler")
const {getApi, getTopics} = require("./controllers/nc-news-controller")

const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.all("*", notFoundErrorHandler);

module.exports = app;