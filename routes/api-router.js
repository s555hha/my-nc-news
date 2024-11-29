const apiRouter = require('express').Router();

const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router');
const usersRouter = require('./users-router');
const topicsRouter = require('./topics-router');

const getApi  = require("../controllers/api.controller")

apiRouter.get('/', getApi);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter)

apiRouter.use('/users', usersRouter);

apiRouter.use('/topics', topicsRouter);


module.exports = apiRouter;