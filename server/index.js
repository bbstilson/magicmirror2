const path = require('path');
const express = require('express');
const axios = require('axios');
const utils = require('./utils');
const checkStatus = utils.checkStatus;
const Weather = require('./constants').Weather;

// SERVER SETUP
const app = express();
const port = (process.env.PORT || 4000);

const NEWS_API_KEY = process.env.NEWS_API_KEY || '';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '';

// ALLOW CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// APIS
app.get('/api/news', (request, response) => {
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

app.get('/api/weather/:window', (request, response) => {
  const ROOT = 'https://api.darksky.net/forecast'
  const LAT = request.query.lat;
  const LON = request.query.lon;
  const url = `${ROOT}/${WEATHER_API_KEY}/${LAT},${LON}`;

  axios.get(url)
    .then(checkStatus)
    .then(({ data }) => {
      switch(request.params.window) {
        case Weather.CURRENT:
          response.json(data.currently);
          break;
        case Weather.FORECAST:
          response.json(data.daily);
          break;
        default:
          response.json({ status: 500, statusText: "Could not find the proper data to send." })
      }
    })
    .catch(error => {
      response.json({
        status: error.status,
        statusText: error.statusText,
      });
    });
});

// RUN SERVER
app.listen(port, err => {
  if (err) {
    console.warn(`Error in app.listen: ${err}`);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
