const utils = require('../utils');
const checkStatus = utils.checkStatus;
const ForecastType = require('./ForecastType.js');

const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '';

module.exports = function WeatherResource(router) {
  router.get('/weather/:window', (request, response) => {
    const ROOT = 'https://api.darksky.net/forecast'
    const LAT = request.query.lat;
    const LON = request.query.lon;
    const url = `${ROOT}/${WEATHER_API_KEY}/${LAT},${LON}`;

    axios.get(url)
      .then(checkStatus)
      .then(({ data }) => {
        switch(request.params.window) {
          case ForecastType.CURRENT:
            response.json(data.currently);
            break;
          case ForecastType.FORECAST:
            response.json(data.daily);
            break;
          default:
            response.json({
              status: 500,
              statusText: 'Could not find the proper data to send.'
            });
        }
      })
      .catch(error => {
        response.json({
          status: error.status,
          statusText: error.statusText,
        });
      });
  });
}
