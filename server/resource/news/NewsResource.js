const utils = require('../utils');
const checkStatus = utils.checkStatus;

const axios = require('axios');

const NEWS_API_KEY = process.env.NEWS_API_KEY || null;

module.exports = function NewsResource(router) {
  router.get('/news', (request, response) => {
    if (!NEWS_API_KEY) {
      console.error('NEWS_API_KEY undefined!');
      response.json({
        status: 500,
        statusText: 'Internal Server Error'
      });
    }

    const ROOT = "https://newsapi.org/v1/articles";
    const SOURCE = `source=${request.query.source ? request.query.source : "bbc-news"}`
    const OPTIONS = "sortBy=top";
    const API_KEY = `apiKey=${NEWS_API_KEY}`;
    const url = `${ROOT}?${SOURCE}&${OPTIONS}&${API_KEY}`;

    axios.get(url)
      .then(checkStatus)
      .then(({ data }) => {
        response.json(data.articles[0]);
      })
      .catch((error) => {
        response.json({
          status: error.status,
          statusText: error.statusText,
        });
      });
  });
}
