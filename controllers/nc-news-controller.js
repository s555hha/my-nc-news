const endpointsJson = require("../endpoints.json")
const selectTopics = require("../models/nc-news-model")

function getApi(req, res){
    res.status(200).send({ endpoints: endpointsJson });
}
function getTopics(req, res) {
    selectTopics().then((topics) => {
      res.status(200).send({ topics });
    });
  }

module.exports = {getApi, getTopics}